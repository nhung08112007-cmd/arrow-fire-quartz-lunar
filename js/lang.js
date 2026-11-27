/* =========================================================
   LỚP NGOẠI NGỮ — Ngôn ngữ › Sách › Bài › Phần
   từ vựng (flashcard đầy đủ), ôn lặp lại ngắt quãng (SM-2),
   nghe chép, trò chơi, ngữ pháp, gia sư AI, thống kê
   ========================================================= */
const LANGS = [
  ['en-US', '🇬🇧', 'Tiếng Anh'], ['ja-JP', '🇯🇵', 'Tiếng Nhật'], ['fr-FR', '🇫🇷', 'Tiếng Pháp'], ['zh-CN', '🇨🇳', 'Tiếng Trung'],
  ['ko-KR', '🇰🇷', 'Tiếng Hàn'], ['de-DE', '🇩🇪', 'Tiếng Đức'], ['es-ES', '🇪🇸', 'Tiếng Tây Ban Nha'], ['it-IT', '🇮🇹', 'Tiếng Ý'],
  ['ru-RU', '🇷🇺', 'Tiếng Nga'], ['pt-BR', '🇧🇷', 'Tiếng Bồ Đào Nha'], ['la', '🏛️', 'Tiếng Latin'], ['other', '🌐', 'Khác']
];
const POS = ['noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'pronoun', 'determiner', 'interjection', 'phrase', 'idiom', 'phrasal verb', 'particle', 'counter', 'other'];
const POS_VI = { noun: 'danh từ', verb: 'động từ', adjective: 'tính từ', adverb: 'trạng từ', preposition: 'giới từ', conjunction: 'liên từ', pronoun: 'đại từ', determiner: 'hạn định từ', interjection: 'thán từ', phrase: 'cụm từ', idiom: 'thành ngữ', 'phrasal verb': 'cụm động từ', particle: 'trợ từ', counter: 'lượng từ', other: 'khác' };

/* ---------- SRS: FSRS-4.5 (Free Spaced Repetition Scheduler) ----------
   Mỗi thẻ có Độ bền trí nhớ S (số ngày để xác suất nhớ còn 90%) và Độ khó D (1–10).
   Lịch ôn đặt đúng lúc xác suất nhớ R tụt về mức mục tiêu (mặc định 90%).
   Thang chấm cũ 0/3/4/5 ↔ FSRS 1 Quên · 2 Khó · 3 Được · 4 Dễ. Thẻ SM-2 cũ được chuyển tự động. */
const SRS = {
  W: [0.4872, 1.4003, 3.7145, 13.8206, 5.1618, 1.2298, 0.8975, 0.031, 1.6474, 0.1367, 1.0461, 2.1072, 0.0793, 0.3246, 1.587, 0.2272, 2.8755],
  F: 19 / 81, DEC: -0.5,
  target() { return Math.min(.97, Math.max(.7, Store.settings().retention || .9)); },
  rating(q) { return q < 3 ? 1 : q === 3 ? 2 : q === 4 ? 3 : 4; },
  clampD: d => Math.min(10, Math.max(1, d)),
  R(t, S) { return Math.pow(1 + this.F * t / S, this.DEC); },
  ivl(S) { return Math.max(1, Math.min(3650, Math.round(S / this.F * (Math.pow(this.target(), 1 / this.DEC) - 1)))); },
  /* trạng thái hiện tại (tự chuyển từ SM-2) */
  fs(c) {
    if (c.fs) return c.fs;
    if (!c.seen) return null;
    const S = Math.max(.5, c.interval || 1), D = this.clampD(11 - ((c.ef || 2.5) - 1.3) * 4);
    return { s: S, d: D, last: c.due ? c.due - (c.interval || 0) * DAY : Date.now() };
  },
  next(c, G, now = Date.now()) {
    const w = this.W, st = this.fs(c);
    const D0 = g => this.clampD(w[4] - (g - 3) * w[5]);
    if (!st) return { s: w[G - 1], d: D0(G), r: 1 };
    const t = Math.max(0, (now - (st.last || now)) / DAY), R = this.R(t, st.s);
    const d = this.clampD(w[7] * D0(3) + (1 - w[7]) * (st.d - w[6] * (G - 3)));
    let S;
    if (G === 1) S = Math.min(st.s, w[11] * Math.pow(st.d, -w[12]) * (Math.pow(st.s + 1, w[13]) - 1) * Math.exp(w[14] * (1 - R)));
    else S = st.s * (1 + Math.exp(w[8]) * (11 - st.d) * Math.pow(st.s, -w[9]) * (Math.exp(w[10] * (1 - R)) - 1) * (G === 2 ? w[15] : 1) * (G === 4 ? w[16] : 1));
    return { s: Math.max(.1, S), d, r: R };
  },
  label(iv) { return iv < 30 ? iv + ' ngày' : iv < 365 ? Math.round(iv / 30) + ' tháng' : (iv / 365).toFixed(1) + ' năm'; },
  preview(c, q) {
    const G = this.rating(q);
    if (G === 1) return { iv: 0, label: '<10 phút' };
    const iv = this.ivl(this.next(c, G).s);
    return { iv, label: this.label(iv) };
  },
  /* chấm thẻ: q theo thang cũ (0/3/4/5) */
  grade(c, q) {
    const G = this.rating(q), now = Date.now(), nx = this.next(c, G, now);
    c.fs = { s: nx.s, d: nx.d, last: now };
    if (G === 1) { c.reps = 0; c.lapses = (c.lapses || 0) + 1; c.due = now + 10 * 60000; c.interval = 0; }
    else {
      let iv = this.ivl(nx.s);
      if (iv > 2) iv = Math.max(1, Math.round(iv * (0.95 + Math.random() * .1)));   // xê dịch nhẹ để thẻ không dồn cùng ngày
      c.reps = (c.reps || 0) + 1; c.interval = iv; c.due = now + iv * DAY;
    }
    c.ef = undefined;
    c.history = c.history || []; c.history.push([now, q]);
    c.seen = true;
    Store.save('cards');
    Activity.add('review');
  },
  /* xác suất còn nhớ lúc này (0–1) */
  recall(c) { const st = this.fs(c); if (!st) return 0; return this.R(Math.max(0, (Date.now() - st.last) / DAY), st.s); },
  state(c) { if (!c.seen) return 'new'; if ((c.interval || 0) >= 21) return 'mature'; return 'learning'; }
};


/* ---------- TỪ ĐIỂN MIỄN PHÍ (không cần AI) ----------
   Tiếng Anh: Free Dictionary API (IPA, từ loại, định nghĩa, ví dụ, đồng/trái nghĩa).
   Mọi ngôn ngữ: MyMemory dịch nghĩa sang tiếng Việt, Tatoeba lấy câu ví dụ có bản dịch. */
const TATOEBA = { en: 'eng', ja: 'jpn', fr: 'fra', zh: 'cmn', ko: 'kor', de: 'deu', es: 'spa', it: 'ita', ru: 'rus', pt: 'por', la: 'lat' };
const Dict = {
  code: lang => (lang || 'en').slice(0, 2).toLowerCase(),
  async json(url) { const r = await fetch(url); if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); },
  async translate(text, from, to = 'vi') {
    if (!text) return '';
    const d = await this.json(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 450))}&langpair=${from}|${to}`);
    const t = d?.responseData?.translatedText || '';
    if (!t || /MYMEMORY WARNING|INVALID|QUERY LENGTH/i.test(t)) throw new Error('hết lượt dịch miễn phí hôm nay');
    return t;
  },
  async english(word) {
    const d = await this.json('https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(word.toLowerCase()));
    const e = d[0] || {}; const out = { examples: [] };
    out.ipa = e.phonetic || (e.phonetics || []).map(p => p.text).find(Boolean) || '';
    const m = e.meanings || [];
    const map = { noun: 'noun', verb: 'verb', adjective: 'adjective', adverb: 'adverb', preposition: 'preposition', conjunction: 'conjunction', pronoun: 'pronoun', interjection: 'interjection', determiner: 'determiner' };
    out.pos = map[m[0]?.partOfSpeech] || '';
    out.def = m.flatMap(x => x.definitions || []).slice(0, 2).map(x => x.definition).join(' / ');
    m.forEach(x => (x.definitions || []).forEach(d => { if (d.example && out.examples.length < 3) out.examples.push({ s: d.example, t: '' }); }));
    const syn = new Set(), ant = new Set();
    m.forEach(x => { (x.synonyms || []).forEach(v => syn.add(v)); (x.antonyms || []).forEach(v => ant.add(v)); (x.definitions || []).forEach(d => { (d.synonyms || []).forEach(v => syn.add(v)); (d.antonyms || []).forEach(v => ant.add(v)); }); });
    out.syn = [...syn].slice(0, 5).join(', '); out.ant = [...ant].slice(0, 4).join(', ');
    return out;
  },
  async sentences(word, lc) {
    const from = TATOEBA[lc]; if (!from) return [];
    const d = await this.json(`https://tatoeba.org/en/api_v0/search?from=${from}&query=${encodeURIComponent('="' + word + '"')}&orphans=no&unapproved=no&sort=relevance&to=vie`).catch(() => null)
      || await this.json(`https://tatoeba.org/en/api_v0/search?from=${from}&query=${encodeURIComponent(word)}&sort=relevance`);
    return (d?.results || []).filter(r => (r.text || '').length < 90).slice(0, 3).map(r => ({ s: r.text, t: ((r.translations || []).flat().find(t => t?.lang === 'vie') || {}).text || '' }));
  },
  /** tra một từ, trả về các trường thẻ tìm được (cái nào lỗi thì bỏ qua) */
  async lookup(word, lang, notes = []) {
    const lc = this.code(lang); const out = { examples: [] };
    if (lc === 'en') { try { Object.assign(out, await this.english(word)); } catch (e) { notes.push('từ điển Anh: không thấy từ'); } }
    try { out.meaning = await this.translate(word, lc === 'zh' ? 'zh-CN' : lc, 'vi'); } catch (e) { notes.push('dịch nghĩa: ' + e.message); }
    if (lc !== 'en') { try { out.def = await this.translate(word, lc === 'zh' ? 'zh-CN' : lc, 'en'); } catch (_) { } }
    if (out.examples.length < 2) { try { out.examples.push(...await this.sentences(word, lc)); } catch (e) { notes.push('câu ví dụ: không tải được'); } }
    for (const ex of out.examples.slice(0, 3)) { if (!ex.t) { try { ex.t = await this.translate(ex.s, lc === 'zh' ? 'zh-CN' : lc, 'vi'); } catch (_) { } } }
    out.examples = out.examples.slice(0, 3);
    return out;
  }
};
const isJa = c => /^ja/i.test(c?.lang || '');
const hasKanji = t => /[一-龯㐀-䶿]/.test(t || '');
/** chữ kèm furigana cho tiếng Nhật */
const rubyWord = (x, c) => {
  const S = Store.settings();
  const reading = (x.ipa || '').split(/[\/／,、]/)[0].trim();
  if (isJa(c) && S.furigana !== false && hasKanji(x.word) && reading && /[぀-ヿ]/.test(reading)) return furi(x.word, reading);
  return esc(x.word || '…');
};
/** gióng cách đọc với chữ: phần kana giữ nguyên, chỉ chữ Hán mới có furigana */
function furi(word, reading) {
  const segs = word.match(/[一-龯㐀-䶿々〆ヵヶ]+|[^一-龯㐀-䶿々〆ヵヶ]+/g) || [word];
  const isK = t => /[一-龯㐀-䶿々]/.test(t);
  const reEsc = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const plain = t => t.split(/([［\[（(][^］\]）)]*[］\]）)])/).map(p => /^[［\[（(]/.test(p) ? '(?:' + reEsc(kata2hira(p.slice(1, -1))) + ')?' : reEsc(kata2hira(p))).join('');
  try {
    const re = new RegExp('^' + segs.map(t => isK(t) ? '(.+?)' : plain(t)).join('') + '$');
    const m = kata2hira(reading).match(re);
    if (m) { let k = 1; return segs.map(t => isK(t) ? `<ruby>${esc(t)}<rt>${esc(m[k++])}</rt></ruby>` : esc(t)).join(''); }
  } catch (e) { }
  return `<ruby>${esc(word)}<rt>${esc(reading)}</rt></ruby>`;
}
/** so đáp án: chấp nhận cả chữ viết, cách đọc (kana) và bỏ qua dấu câu, khoảng trắng */
/** katakana → hiragana để ハンサム = はんさむ */
const kata2hira = s => s.replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
/** chuẩn hoá: toàn/bán độ rộng (NFKC), hoa/thường, katakana/hiragana, bỏ mọi loại ngoặc, dấu câu, khoảng trắng */
const normAns = t => kata2hira((t || '').normalize('NFKC').toLowerCase()).replace(/[\s.,!?;:"'“”‘’「」『』【】〔〕《》〈〉｛｝{}()\[\]。、・·〜~…\-–—]/g, '');
/** các dạng chấp nhận: có hoặc không có phần trong ngoặc (［な］, ［お］, （ミルク）…) */
const BRK = /[［\[【〔（(｛{〈《][^［\[【〔（(｛{〈《\]］】〕）)｝}〉》]*[\]］】〕）)｝}〉》]/g;
const ansForms = s => { s = s || ''; const f = [s, s.replace(BRK, '')]; (s.match(BRK) || []).forEach(m => f.push(m.slice(1, -1))); return [...new Set(f.map(x => x.trim()).filter(Boolean))]; };
const cardForms = x => [x.word, ...(x.ipa || '').split(/[\/／,、]/)].flatMap(ansForms).filter(f => normAns(f).length);
const answerOk = (input, x) => { const v = normAns(input); if (!v) return false; return cardForms(x).map(normAns).includes(v); };
/** chấm có độ lệch: ok = khớp hẳn, near = chỉ sai nhỏ (≥80% & đủ dài) */
function judgeAns(input, targets) {
  const v = normAns(input); if (!v) return { ok: false, near: false, pct: 0, best: targets[0] || '' };
  let pct = 0, best = targets[0] || '';
  targets.flatMap(ansForms).forEach(f => { const p = normAns(f) === v ? 100 : similarity(input, f); if (p > pct) { pct = p; best = f; } });
  const L = normAns(best).length;
  return { ok: pct === 100, near: pct < 100 && ((pct >= 80 && L >= 3) || (pct >= 75 && L >= 4)), pct, best };
}
const judgeCard = (input, x) => judgeAns(input, cardForms(x));
/** tô màu từng chữ của đáp án: xanh = bạn gõ đúng, đỏ = thiếu/sai (dùng LCS, hợp cho tiếng Nhật không có dấu cách) */
function charDiff(typed, target) {
  const A = [...target], B = [...normAns(typed)], a = A.map(ch => normAns(ch));
  const dp = Array.from({ length: A.length + 1 }, () => new Array(B.length + 1).fill(0));
  for (let i = A.length - 1; i >= 0; i--) for (let j = B.length - 1; j >= 0; j--) dp[i][j] = a[i] && a[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  let i = 0, j = 0; const out = [];
  while (i < A.length) {
    if (!a[i]) { out.push(esc(A[i])); i++; continue; }
    if (j < B.length && a[i] === B[j]) { out.push(`<span class="d-ok">${esc(A[i])}</span>`); i++; j++; }
    else if (j < B.length && dp[i][j + 1] >= dp[i + 1][j]) j++;
    else { out.push(`<span class="d-bad">${esc(A[i])}</span>`); i++; }
  }
  return out.join('');
}
/** giống nhau bao nhiêu % (khoảng cách Levenshtein trên chữ đã chuẩn hoá) */
function similarity(a, b) {
  a = normAns(a); b = normAns(b); if (!a || !b) return 0; if (a === b) return 100;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return Math.max(0, Math.round(100 * (1 - dp[a.length][b.length] / Math.max(a.length, b.length))));
}
/** câu ví dụ thật (không phải câu tự viết) */
const exOf = x => { const l = (x.examples || []).filter(e => e.s && e.t && e.t !== '(câu của tôi)'); return l.length ? l[Math.floor(Math.random() * l.length)] : null; };
/** câu ví dụ có chứa từ, để làm bài điền chỗ trống */
function clozeOf(x) {
  const forms = [x.word, ...(x.ipa || '').split(/[\/／,、]/)].map(t => t.trim()).filter(t => t.length > 0);
  for (const ex of x.examples || []) for (const f of forms) {
    const i = ex.s.toLowerCase().indexOf(f.toLowerCase());
    if (i >= 0) return { before: ex.s.slice(0, i), after: ex.s.slice(i + f.length), hidden: ex.s.slice(i, i + f.length), t: ex.t };
    if (!isJa({ lang: '' }) && f.length > 4) { const stem = f.slice(0, Math.max(3, f.length - 2)).toLowerCase(); const j = ex.s.toLowerCase().indexOf(stem); if (j >= 0) { const m = ex.s.slice(j).match(/^[\p{L}'-]+/u); if (m) return { before: ex.s.slice(0, j), after: ex.s.slice(j + m[0].length), hidden: m[0], t: ex.t }; } }
  }
  return null;
}

const Lang = {
  scope: {},  // {courseId: {bookId, unitId, part}}
  /* ---------- danh sách ngôn ngữ ---------- */
  home(view) {
    const courses = Store.list('courses');
    view.innerHTML = `
    <div class="page lang-home">
      <header class="page-hero" style="--hc:#b8f0a0">
        <div class="ph-art scene">${Art.scene('lang')}</div>
        <div class="ph-txt"><div class="kicker">Tầng 3 · Lớp Ngoại Ngữ</div><h1>Lớp học của thầy Ếch Kính</h1>
          <p>Mỗi ngôn ngữ là một lớp học. Bên trong chia theo <b>Sách › Bài › Phần</b>. Có flashcard đầy đủ, ôn lặp lại ngắt quãng, nghe chép, trò chơi, ngữ pháp và gia sư AI.</p>
          <div class="lh-acts"><button class="btn pri big" id="addCourse">＋ Mở lớp ngôn ngữ mới</button><button class="btn big" id="addPack">📚 Thư viện giáo trình</button></div></div>
      </header>
      <div class="course-grid">${courses.map(c => {
        const cs = Store.list('cards').filter(x => x.courseId === c.id); const due = cs.filter(x => x.seen && (x.due || 0) <= Date.now()).length;
        return `<a class="course-card" href="#/ngoai-ngu/${c.id}" style="--cc:${c.color}">
          <span class="cc-flag">${c.flag}</span><h3>${esc(c.name)}</h3>
          <div class="cc-stats"><span>🃏 ${cs.length} thẻ</span><span class="${due ? 'hot' : ''}">⏰ ${due} đến hạn</span><span>📚 ${Store.list('tbooks').filter(b => b.courseId === c.id).length} sách</span></div>
          <div class="cc-bar"><i style="width:${cs.length ? cs.filter(x => SRS.state(x) === 'mature').length / cs.length * 100 : 0}%"></i></div>
          <span class="cc-cre">${Art.creature(['prof', 'fish', 'note', 'booky', 'tomato'][hashStr(c.id) % 5], { size: 60, mood: 'joy' })}</span>
        </a>`;
      }).join('')}${courses.length ? '' : `<div class="empty big">${Art.creature('prof', { size: 110 })}<p>Chưa có lớp nào. Mở lớp đầu tiên nhé!</p></div>`}</div>
    </div>`;
    $('#addCourse').onclick = () => this.courseForm();
    $('#addPack').onclick = () => Packs.open();
  },
  courseForm(c) {
    const isNew = !c; c = c || { id: uid(), name: '', lang: 'en-US', flag: '🇬🇧', color: '#b8f0a0', native: 'vi' };
    modal({
      title: isNew ? 'Mở lớp mới' : 'Sửa lớp', body: `
        <label class="lbl">Ngôn ngữ</label><div class="lang-pick">${LANGS.map(l => `<button data-l="${l[0]}" data-f="${l[1]}" data-n="${l[2]}" class="${c.lang === l[0] ? 'on' : ''}">${l[1]} ${l[2]}</button>`).join('')}</div>
        <label class="lbl">Tên lớp</label><input class="inp" id="cName" value="${esc(c.name)}" placeholder="vd: Tiếng Anh học thuật">
        <label class="lbl">Mã giọng đọc (TTS)</label><input class="inp" id="cLang" value="${esc(c.lang)}">
        <label class="lbl">Màu lớp</label><div class="row">${Art.palette.map(p => `<span class="sw ${c.color === p ? 'on' : ''}" data-col="${p}" style="background:${p}"></span>`).join('')}</div>`,
      onOpen: w => {
        $$('.lang-pick button', w).forEach(b => b.onclick = () => { $$('.lang-pick button', w).forEach(x => x.classList.toggle('on', x === b)); c.flag = b.dataset.f; $('#cLang', w).value = b.dataset.l === 'other' ? '' : b.dataset.l; if (!$('#cName', w).value) $('#cName', w).value = b.dataset.n; });
        $$('[data-col]', w).forEach(s => s.onclick = () => { c.color = s.dataset.col; $$('[data-col]', w).forEach(x => x.classList.toggle('on', x === s)); });
      },
      actions: [...(!isNew ? [{ label: '🗑 Xoá lớp', cls: 'danger', onClick: async () => { if (await confirmBox('Xoá lớp và TOÀN BỘ thẻ, ngữ pháp bên trong?')) { ['tbooks', 'cards', 'grammar'].forEach(k => { Store.data[k] = Store.list(k).filter(x => x.courseId !== c.id); Store.save(k); }); Store.remove('courses', c.id); Router.go('/ngoai-ngu'); } } }] : []),
      { label: 'Lưu', cls: 'pri', onClick: w => { c.name = $('#cName', w).value.trim() || 'Lớp mới'; c.lang = $('#cLang', w).value.trim() || 'en-US'; Store.upsert('courses', c); if (isNew) { Store.upsert('tbooks', { id: uid(), courseId: c.id, title: 'Sách 1', units: [{ id: uid(), title: 'Bài 1', parts: ['Phần 1'] }] }); Router.go('/ngoai-ngu/' + c.id); } else Router.resolve(); } }]
    });
  },

  /* ---------- không gian một lớp ---------- */
  course(view, cid, tab = 'hanh-trinh') {
    if (tab === 'on-tap') tab = 'hoc';
    if (tab === 'video') { this._ls = 'video'; tab = 'nghe-chep'; }
    const c = Store.find('courses', cid); if (!c) return Router.go('/ngoai-ngu');
    const sc = this.scope[cid] = this.scope[cid] || {};
    view.classList.add('full');
    const TABS = [['hanh-trinh', '🗺 Hành trình'], ['hoc', '🧠 Học & ôn'], ['tu-vung', '🃏 Thẻ từ'], ['nghe-chep', '🎧 Nghe & nói'], ...(isJa(c) || /^zh/.test(c.lang || '') ? [['viet-chu', '✍️ Viết chữ']] : []), ['bai-tap', '✦ Bài tập AI'], ['tro-choi', '🎮 Trò chơi'], ['ngu-phap', '📐 Ngữ pháp'], ['gia-su', '✦ Gia sư AI'], ['thong-ke', '📊 Thống kê']];
    view.innerHTML = `
    <div class="lang-ws" style="--cc:${c.color}">
      <aside class="ws-tree">
        <div class="wt-head"><a href="#/ngoai-ngu" class="back">‹</a><span class="flag">${c.flag}</span><b>${esc(c.name)}</b><button class="mini-btn" id="cEdit">⚙</button></div>
        <div class="wt-body" id="tree"></div>
        <button class="btn sm wide" id="addTb">＋ Thêm sách / giáo trình</button>
        <button class="btn sm wide" id="addPack">📚 Thư viện giáo trình</button>
        <div class="wt-cre">${Art.creature('prof', { size: 70 })}<small>Chọn phạm vi bên trên — mọi thẻ, bài ôn, trò chơi sẽ lấy theo phạm vi đó.</small></div>
      </aside>
      <section class="ws-main">
        <div class="today" id="today"></div>
        <nav class="ws-tabs">${TABS.map(t => `<a href="#/ngoai-ngu/${cid}/${t[0]}" class="${tab === t[0] ? 'on' : ''}">${t[1]}</a>`).join('')}</nav>
        <div class="ws-scope" id="scopeLbl"></div>
        <div class="ws-body" id="wsBody"></div>
      </section>
    </div>`;
    const tbs = () => Store.list('tbooks').filter(b => b.courseId === cid);
    const drawTree = () => {
      $('#tree').innerHTML = `<div class="tn ${!sc.bookId ? 'on' : ''}" data-k="all">🌐 Toàn bộ lớp <small>${this.cardsIn(cid, {}).length}</small></div>` + tbs().map(b => `
        <div class="tn tn-b ${sc.bookId === b.id && !sc.unitId ? 'on' : ''}" data-b="${b.id}">📘 ${esc(b.title)} <small>${this.cardsIn(cid, { bookId: b.id }).length}</small><span class="tn-act"><i data-a="addU" data-b="${b.id}" title="Thêm bài">＋</i><i data-a="renB" data-b="${b.id}" title="Đổi tên">✎</i><i data-a="delB" data-b="${b.id}" title="Xoá">✕</i></span></div>
        ${(b.units || []).map(u => `
          <div class="tn tn-u ${sc.unitId === u.id && !sc.part ? 'on' : ''}" data-b="${b.id}" data-u="${u.id}">📄 ${esc(u.title)} <small>${this.cardsIn(cid, { bookId: b.id, unitId: u.id }).length}</small><span class="tn-act"><i data-a="addP" data-b="${b.id}" data-u="${u.id}" title="Thêm phần">＋</i><i data-a="renU" data-b="${b.id}" data-u="${u.id}">✎</i><i data-a="delU" data-b="${b.id}" data-u="${u.id}">✕</i></span></div>
          ${(u.parts || []).map(p => `<div class="tn tn-p ${sc.unitId === u.id && sc.part === p ? 'on' : ''}" data-b="${b.id}" data-u="${u.id}" data-p="${esc(p)}">· ${esc(p)} <small>${this.cardsIn(cid, { bookId: b.id, unitId: u.id, part: p }).length}</small><span class="tn-act"><i data-a="delP" data-b="${b.id}" data-u="${u.id}" data-p="${esc(p)}">✕</i></span></div>`).join('')}
        `).join('')}`).join('');
      const b = tbs().find(x => x.id === sc.bookId), u = b?.units.find(x => x.id === sc.unitId);
      $('#scopeLbl').innerHTML = `Phạm vi: <b>${b ? esc(b.title) : 'Toàn bộ lớp'}</b>${u ? ' › ' + esc(u.title) : ''}${sc.part ? ' › ' + esc(sc.part) : ''} · ${this.cardsIn(cid, sc).length} thẻ`;
    };
    $('#tree').addEventListener('click', async e => {
      const a = e.target.dataset.a;
      if (a) {
        e.stopPropagation();
        const b = Store.find('tbooks', e.target.dataset.b); const u = b?.units.find(x => x.id === e.target.dataset.u);
        if (a === 'addU') { const t = await promptBox('Tên bài mới', `Bài ${b.units.length + 1}`); if (t) b.units.push({ id: uid(), title: t, parts: [] }); }
        if (a === 'addP') { const t = await promptBox('Tên phần', `Phần ${u.parts.length + 1}`); if (t) u.parts.push(t); }
        if (a === 'renB') { const t = await promptBox('Đổi tên sách', b.title); if (t) b.title = t; }
        if (a === 'renU') { const t = await promptBox('Đổi tên bài', u.title); if (t) u.title = t; }
        if (a === 'delB' && await confirmBox(`Xoá sách "${b.title}"? (thẻ vẫn giữ trong lớp)`)) { Store.remove('tbooks', b.id); sc.bookId = sc.unitId = sc.part = undefined; }
        if (a === 'delU' && await confirmBox(`Xoá bài "${u.title}"?`)) { b.units = b.units.filter(x => x !== u); sc.unitId = sc.part = undefined; }
        if (a === 'delP' && await confirmBox('Xoá phần này?')) { u.parts = u.parts.filter(x => x !== e.target.dataset.p); sc.part = undefined; }
        if (Store.find('tbooks', b?.id)) Store.upsert('tbooks', b);
        drawTree(); return;
      }
      const n = e.target.closest('.tn'); if (!n) return;
      sc.bookId = n.dataset.b; sc.unitId = n.dataset.u; sc.part = n.dataset.p;
      drawTree(); render();
    });
    $('#addPack').onclick = () => Packs.open(cid);
    $('#addTb').onclick = async () => { const t = await promptBox('Tên sách / giáo trình', 'Sách ' + (tbs().length + 1)); if (t) { Store.upsert('tbooks', { id: uid(), courseId: cid, title: t, units: [] }); drawTree(); } };
    $('#cEdit').onclick = () => this.courseForm(c);
    const drawToday = () => {
      const all = this.cardsIn(cid, {}); const S = Store.settings();
      const due = all.filter(x => x.seen && (x.due || 0) <= Date.now()).length, fresh = Math.min(S.newPerDay || 20, all.filter(x => !x.seen).length);
      const log = Store.get('log', {})[today()] || {}; const doneToday = log.review || 0;
      const goal = Math.max(10, due + fresh), pct = Math.min(100, Math.round(doneToday / goal * 100));
      const mins = Math.max(1, Math.round((due + fresh) * 8 / 60));
      $('#today').innerHTML = `<div class="td-ring" style="--p:${pct}"><b>${pct}%</b><small>hôm nay</small></div>
        <div class="td-txt"><b>${due + fresh ? `Hôm nay: ${due} thẻ đến hạn + ${fresh} thẻ mới · khoảng ${mins} phút` : 'Đã ôn xong mọi thẻ đến hạn hôm nay 🎉'}</b>
        ${this.gramDueCount(c) ? `<a class="muted" href="#/ngoai-ngu/${cid}/ngu-phap">🔁 ${this.gramDueCount(c)} điểm ngữ pháp đến hạn ôn</a>` : ''}
        <span class="muted">Đã ôn ${doneToday} lượt · chuỗi ${Activity.streak()} ngày 🔥${isJa(c) ? ` · <label><input type="checkbox" id="tdFuri" ${S.furigana !== false ? 'checked' : ''}> hiện furigana</label>` : ''}</span></div>
        <a class="btn pri" href="#/ngoai-ngu/${cid}/hoc">▶ Vào học</a>`;
      $('#tdFuri') && ($('#tdFuri').onchange = e => { S.furigana = e.target.checked; Store.save('settings'); render(); });
    };
    const body = $('#wsBody');
    const render = () => {
      drawTree(); drawToday();
      const fn = { 'hanh-trinh': 'journey', 'hoc': 'study', 'tu-vung': 'vocab', 'nghe-chep': 'listenSpeak', 'viet-chu': 'writing', 'bai-tap': 'aiExercises', 'tro-choi': 'games', 'ngu-phap': 'grammar', 'gia-su': 'tutor', 'thong-ke': 'stats' }[tab] || 'journey';
      this[fn](body, c, sc, render);
    };
    render();
    return () => { Speech.stop(); this._gameStop && this._gameStop(); };
  },
  cardsIn(cid, sc) {
    return Store.list('cards').filter(x => x.courseId === cid && (!sc.bookId || x.bookId === sc.bookId) && (!sc.unitId || x.unitId === sc.unitId) && (!sc.part || x.part === sc.part));
  },

  /* ---------- TỪ VỰNG ---------- */
  vocab(el, c, sc, rerender) {
    const S = Store.settings(); S.vocabView = S.vocabView || 'grid';
    let q = '', st = '';
    el.innerHTML = `
      <div class="filter-row">
        <button class="btn pri" id="vAdd">＋ Thêm từ</button>
        <button class="btn" id="vBulk">⚡ Thêm hàng loạt</button>
        <button class="btn" id="vFill" title="AI điền các ô còn trống (cách đọc, ví dụ, đồng/trái nghĩa, mẹo nhớ…) cho mọi thẻ trong phạm vi">✦ AI điền ô trống</button>
        <button class="btn hot" id="vFlash">🃏 Lật thẻ</button>
        <input class="inp grow" id="vq" placeholder="🔍 Tìm từ, nghĩa, ví dụ…">
        <select class="inp sel" id="vst"><option value="">Mọi trạng thái</option><option value="new">🥚 Mới</option><option value="learning">🐣 Đang học</option><option value="mature">🐥 Thuộc</option><option value="leech">🐛 Hay quên</option><option value="due">⏰ Đến hạn</option></select>
        <div class="seg" id="vview">${[['grid', '▦'], ['table', '☰']].map(v => `<button data-v="${v[0]}" class="${S.vocabView === v[0] ? 'on' : ''}">${v[1]}</button>`).join('')}</div>
      </div>
      <div id="vlist"></div>`;
    const draw = () => {
      const cs = this.cardsIn(c.id, sc).filter(x => (!st || (st === 'leech' ? (x.lapses || 0) >= 3 : st === 'due' ? x.seen && (x.due || 0) <= Date.now() : SRS.state(x) === st)) && (!q || [x.word, x.meaning, x.def, (x.examples || []).map(e => e.s).join(' ')].join(' ').toLowerCase().includes(q)));
      const icon = x => ({ new: '🥚', learning: '🐣', mature: '🐥' }[SRS.state(x)]);
      $('#vlist').className = S.vocabView === 'grid' ? 'vgrid' : 'vtable';
      $('#vlist').innerHTML = !cs.length ? `<div class="empty big">${Art.creature('fish', { size: 100, mood: 'wow' })}<p>Chưa có từ nào trong phạm vi này.</p></div>` :
        S.vocabView === 'grid' ? cs.map(x => `<div class="vcard" data-id="${x.id}">
          <div class="vc-top"><span class="vc-st">${icon(x)}${(x.lapses || 0) >= 3 ? ' 🐛' : ''}</span><span class="vc-pos">${esc(x.pos || '')}</span><button class="vc-say" data-say="${esc(x.word)}">🔊</button></div>
          <div class="vc-word">${rubyWord(x, c)}</div>${x.ipa && !(isJa(c) && hasKanji(x.word)) ? `<div class="vc-ipa">${esc(x.ipa)}</div>` : ''}
          <div class="vc-mean">${esc(x.meaning || x.def || '')}</div>
          ${x.examples?.[0] ? `<div class="vc-ex">“${esc(x.examples[0].s)}”</div>` : ''}
          <div class="vc-due">${x.seen ? (x.due <= Date.now() ? '⏰ đến hạn' : 'ôn lại ' + fmtDate(x.due)) : 'chưa học'}</div></div>`).join('')
          : `<table><thead><tr><th></th><th>Từ</th><th>Từ loại</th><th>Nghĩa</th><th>Ví dụ</th><th>Đồng nghĩa</th><th>Trái nghĩa</th><th>Đến hạn</th></tr></thead><tbody>${cs.map(x => `<tr data-id="${x.id}"><td>${icon(x)}</td><td><b>${esc(x.word)}</b><br><small>${esc(x.ipa || '')}</small></td><td>${esc(x.pos || '')}</td><td>${esc(x.meaning || '')}<br><small class="muted">${esc(x.def || '')}</small></td><td><small>${esc(x.examples?.[0]?.s || '')}</small></td><td><small>${esc(x.syn || '')}</small></td><td><small>${esc(x.ant || '')}</small></td><td><small>${x.seen ? fmtDate(x.due) : '—'}</small></td></tr>`).join('')}</tbody></table>`;
    };
    draw();
    $('#vFill').onclick = () => this.bulkFill(c, sc, draw);
    $('#vq').oninput = debounce(e => { q = e.target.value.toLowerCase(); draw(); }, 150);
    $('#vst').onchange = e => { st = e.target.value; draw(); };
    $$('#vview button').forEach(b => b.onclick = () => { S.vocabView = b.dataset.v; Store.save('settings'); $$('#vview button').forEach(x => x.classList.toggle('on', x === b)); draw(); });
    $('#vlist').addEventListener('click', e => {
      if (e.target.dataset.say) { e.stopPropagation(); return Speech.speak(e.target.dataset.say, c.lang); }
      const id = e.target.closest('[data-id]')?.dataset.id; if (id) this.cardForm(c, sc, Store.find('cards', id), rerender);
    });
    $('#vAdd').onclick = () => this.cardForm(c, sc, null, rerender);
    $('#vBulk').onclick = () => this.bulk(c, sc, rerender);
    $('#vFlash').onclick = () => { const cs = this.cardsIn(c.id, sc); cs.length ? this.flash(c, cs) : toast('Chưa có thẻ', 'err'); };
  },

  cardForm(c, sc, card, after, pre = {}) {
    if (!card && this._mineNext) { pre.mined = true; this._mineNext = false; }
    const x = card || { id: uid(), courseId: c.id, bookId: sc.bookId, unitId: sc.unitId, part: sc.part, word: pre.word || '', ipa: '', pos: '', meaning: '', def: '', usage: '', examples: pre.sentence ? [{ s: pre.sentence, t: '' }] : [], syn: '', ant: '', coll: '', family: '', tags: [], note: '', source: pre.source || '' };
    const tb = Store.list('tbooks').filter(b => b.courseId === c.id);
    modal({
      title: card ? '✎ Sửa thẻ' : '🃏 Thẻ từ mới', full: true, cls: 'card-modal',
      body: `<div class="cf">
        <div class="cf-l">
          <div class="row"><input class="inp big-word grow" id="fw" value="${esc(x.word)}" placeholder="Từ / cụm từ"><button class="btn" id="fsay">🔊</button><button class="btn hot" id="fdict" title="Không cần AI: từ điển + dịch + câu ví dụ miễn phí">📖 Tra từ điển</button><button class="btn pri" id="fai">✦ AI điền hết</button></div>
          <div class="row2"><div><label class="lbl">Phiên âm / IPA / kana / pinyin</label><input class="inp" id="fipa" value="${esc(x.ipa)}"></div>
          <div><label class="lbl">Từ loại</label><select class="inp" id="fpos"><option value="">—</option>${POS.map(p => `<option value="${p}" ${x.pos === p ? 'selected' : ''}>${p} · ${POS_VI[p]}</option>`).join('')}</select></div></div>
          <label class="lbl">Nghĩa tiếng Việt</label><input class="inp" id="fmean" value="${esc(x.meaning)}">
          <label class="lbl">Định nghĩa (bằng ngôn ngữ đích)</label><textarea class="inp" id="fdef" rows="2">${esc(x.def)}</textarea>
          <label class="lbl">⚠️ Lưu ý cách dùng (ngữ vực, sắc thái, lỗi hay gặp…)</label><textarea class="inp" id="fuse" rows="2">${esc(x.usage)}</textarea>
          <label class="lbl">Ví dụ <small class="muted">(mỗi dòng: câu | dịch)</small></label><textarea class="inp" id="fex" rows="4">${esc((x.examples || []).map(e => e.s + (e.t ? ' | ' + e.t : '')).join('\n'))}</textarea>
          <div class="row2"><div><label class="lbl">≈ Đồng nghĩa</label><input class="inp" id="fsyn" value="${esc(x.syn)}"></div><div><label class="lbl">≠ Trái nghĩa</label><input class="inp" id="fant" value="${esc(x.ant)}"></div></div>
          <div class="row2"><div><label class="lbl">Kết hợp từ (collocation)</label><input class="inp" id="fcoll" value="${esc(x.coll || '')}"></div><div><label class="lbl">Họ từ</label><input class="inp" id="ffam" value="${esc(x.family || '')}"></div></div>
          <label class="lbl">💡 Mẹo nhớ <small class="muted">(liên tưởng âm thanh, hình ảnh, câu chuyện)</small></label><textarea class="inp" id="fnote" rows="2">${esc(x.note || '')}</textarea>
          <div class="row2"><div><label class="lbl">🖼 Hình gợi nhớ <small class="muted">(emoji hoặc ảnh)</small></label><div class="row"><input class="inp" id="femo" value="${esc(x.emoji || '')}" placeholder="vd: 🌸" style="width:90px"><button class="btn sm" id="fimg">📁 Ảnh</button><button class="btn sm" id="fimgX" ${x.img ? '' : 'hidden'}>✕ bỏ ảnh</button></div></div>
          <div><label class="lbl">Nguồn gặp từ</label><input class="inp" id="fsrc" value="${esc(x.source || '')}" placeholder="bài báo, video, sách…"></div></div>
          <div class="row2"><div><label class="lbl">Sách › Bài</label><select class="inp" id="fscope"><option value="">— không —</option>${tb.map(b => `<option value="${b.id}|" ${x.bookId === b.id && !x.unitId ? 'selected' : ''}>📘 ${esc(b.title)}</option>${(b.units || []).map(u => `<option value="${b.id}|${u.id}" ${x.unitId === u.id ? 'selected' : ''}>  📄 ${esc(b.title)} › ${esc(u.title)}</option>`).join('')}`).join('')}</select></div>
          <div><label class="lbl">Phần</label><input class="inp" id="fpart" value="${esc(x.part || '')}" list="partsList"><datalist id="partsList">${tb.flatMap(b => (b.units || []).flatMap(u => u.parts || [])).map(p => `<option>${esc(p)}</option>`).join('')}</datalist></div></div>
        </div>
        <div class="cf-r"><div class="lbl">Xem trước thẻ (bấm để lật)</div><div id="fprev"></div></div>
      </div>`,
      onOpen: w => {
        const read = () => {
          const [b, u] = ($('#fscope', w).value || '|').split('|');
          return Object.assign(x, {
            word: $('#fw', w).value.trim(), ipa: $('#fipa', w).value.trim(), pos: $('#fpos', w).value, meaning: $('#fmean', w).value.trim(), def: $('#fdef', w).value.trim(),
            usage: $('#fuse', w).value.trim(), examples: $('#fex', w).value.split('\n').map(l => l.trim()).filter(Boolean).map(l => { const [s, t] = l.split('|'); return { s: s.trim(), t: (t || '').trim() }; }),
            syn: $('#fsyn', w).value.trim(), ant: $('#fant', w).value.trim(), coll: $('#fcoll', w).value.trim(), family: $('#ffam', w).value.trim(), note: $('#fnote', w).value.trim(),
            emoji: $('#femo', w).value.trim(), source: $('#fsrc', w).value.trim(),
            bookId: b || undefined, unitId: u || undefined, part: $('#fpart', w).value.trim() || undefined
          });
        };
        const prev = () => { $('#fprev', w).innerHTML = this.cardFace(read(), c, true); };
        prev();
        w.addEventListener('input', debounce(prev, 200));
        $('#fprev', w).onclick = () => $('.flip', w)?.classList.toggle('flipped');
        $('#fsay', w).onclick = () => Speech.speak($('#fw', w).value, c.lang);
        $('#fimg', w).onclick = async () => { const f = await pickFile(); if (f) { x.img = await fileToDataURL(f, 320); $('#fimgX', w).hidden = false; prev(); } };
        $('#fimgX', w).onclick = () => { x.img = ''; $('#fimgX', w).hidden = true; prev(); };
        $('#fai', w).onclick = async e => {
          const word = $('#fw', w).value.trim(); if (!word) return toast('Nhập từ trước đã', 'err');
          const ex = $('#fex', w).value.trim();
          const o = await AI.withSpinner(e.currentTarget, () => AI.json({
            system: 'Bạn là nhà từ điển học và giáo viên ngôn ngữ cho người Việt.',
            prompt: `Ngôn ngữ: ${c.name} (${c.lang}). Từ: "${word}"${ex ? `\nNgữ cảnh gặp: "${ex}"` : ''}\nTrả về JSON: {"ipa":"phiên âm (IPA/kana+romaji/pinyin tuỳ ngôn ngữ)","pos":"một trong: ${POS.join(', ')}","meaning":"nghĩa tiếng Việt ngắn gọn","def":"định nghĩa ngắn bằng ngôn ngữ đích","usage":"lưu ý cách dùng bằng tiếng Việt: ngữ vực, sắc thái, giới từ đi kèm, lỗi thường gặp (để trống nếu không có)","examples":[{"s":"câu ví dụ tự nhiên","t":"dịch tiếng Việt"}],"syn":"đồng nghĩa, phẩy ngăn cách (hoặc rỗng)","ant":"trái nghĩa (hoặc rỗng)","coll":"3-4 collocation phổ biến","family":"họ từ (hoặc rỗng)","note":"mẹo nhớ vui (tiếng Việt)"}. Cho 3 ví dụ.`
          }));
          if (!o) return;
          const set = (id, v) => { if (v && !$(id, w).value.trim()) $(id, w).value = v; };
          set('#fipa', o.ipa); if (!$('#fpos', w).value && POS.includes(o.pos)) $('#fpos', w).value = o.pos;
          set('#fmean', o.meaning); set('#fdef', o.def); set('#fuse', o.usage); set('#fsyn', o.syn); set('#fant', o.ant); set('#fcoll', o.coll); set('#ffam', o.family); set('#fnote', o.note);
          const exs = (o.examples || []).map(e => e.s + (e.t ? ' | ' + e.t : '')).join('\n');
          $('#fex', w).value = ($('#fex', w).value.trim() ? $('#fex', w).value.trim() + '\n' : '') + exs;
          prev(); toast('AI đã điền xong ✦');
        };
        $('#fdict', w).onclick = async e => {
          const word = $('#fw', w).value.trim(); if (!word) return toast('Nhập từ trước đã', 'err');
          const btn = e.currentTarget, old = btn.innerHTML; btn.disabled = true; btn.innerHTML = '<span class="spin">✦</span> Đang tra…';
          const notes = [];
          try {
            const o = await Dict.lookup(word, c.lang, notes);
            const set = (id, v) => { if (v && !$(id, w).value.trim()) $(id, w).value = v; };
            set('#fipa', o.ipa); if (!$('#fpos', w).value && POS.includes(o.pos)) $('#fpos', w).value = o.pos;
            set('#fmean', o.meaning); set('#fdef', o.def); set('#fsyn', o.syn); set('#fant', o.ant);
            const exs = (o.examples || []).map(e => e.s + (e.t ? ' | ' + e.t : '')).join('\n');
            if (exs) $('#fex', w).value = ($('#fex', w).value.trim() ? $('#fex', w).value.trim() + '\n' : '') + exs;
            prev();
            toast(notes.length ? 'Đã điền phần tìm được. Chưa có: ' + notes.join('; ') : 'Đã tra xong 📖', notes.length ? 'err' : 'ok', 5000);
          } catch (err) { toast('Không tra được: ' + err.message, 'err'); }
          btn.disabled = false; btn.innerHTML = old;
        };
        this._readCard = read;
      },
      actions: [
        ...(card ? [{ label: '🗑 Xoá', cls: 'danger', onClick: async () => { if (await confirmBox('Xoá thẻ này?')) { Store.remove('cards', x.id); after && after(); } } }] : []),
        { label: 'Huỷ' },
        ...(!card ? [{ label: 'Lưu & thêm tiếp', onClick: () => { const v = this._readCard(); if (!v.word) return false; Store.upsert('cards', v); Activity.add('card'); this.track(c.id, 'cards'); if (pre.mined) this.track(c.id, 'mined'); after && after(); setTimeout(() => this.cardForm(c, sc, null, after), 250); } }] : []),
        { label: '💾 Lưu thẻ', cls: 'pri', onClick: () => { const v = this._readCard(); if (!v.word) { toast('Cần nhập từ', 'err'); return false; } Store.upsert('cards', v); if (!card) { Activity.add('card'); this.track(c.id, 'cards'); if (pre.mined) this.track(c.id, 'mined'); } toast('Đã lưu thẻ 🃏'); after && after(); } }
      ]
    });
  },

  cardFace(x, c, preview = false) {
    return `<div class="flip ${preview ? 'pv' : ''}"><div class="flip-in">
      <div class="face front"><span class="fc-cre">${x.img ? `<img class="fc-img" src="${esc(x.img)}" alt="">` : x.emoji ? `<span class="fc-emo">${esc(x.emoji)}</span>` : Art.creature('fish', { size: 40, mood: 'joy' })}</span>
        <div class="fc-word">${rubyWord(x, c)}</div>${x.ipa && !(isJa(c) && hasKanji(x.word) && Store.settings().furigana !== false) ? `<div class="fc-ipa">${esc(x.ipa)}</div>` : ''}${x.pos ? `<div class="fc-pos">${esc(x.pos)} · ${POS_VI[x.pos] || ''}</div>` : ''}<div class="fc-hint">bấm / Space để lật</div></div>
      <div class="face back">
        <div class="fb-head"><b>${rubyWord(x, c)}</b> <span class="fc-pos">${esc(x.pos || '')}</span> <span class="muted">${esc(x.ipa || '')}</span></div>
        ${x.meaning ? `<div class="fb-mean">${esc(x.meaning)}</div>` : ''}
        ${x.def ? `<div class="fb-def">${esc(x.def)}</div>` : ''}
        ${x.usage ? `<div class="fb-use">⚠️ ${esc(x.usage)}</div>` : ''}
        ${(x.examples || []).length ? `<ul class="fb-ex">${x.examples.map(e => `<li>${esc(e.s)}${e.t ? `<small>${esc(e.t)}</small>` : ''}</li>`).join('')}</ul>` : ''}
        <div class="fb-rel">${x.syn ? `<span>≈ ${esc(x.syn)}</span>` : ''}${x.ant ? `<span>≠ ${esc(x.ant)}</span>` : ''}${x.coll ? `<span>⊕ ${esc(x.coll)}</span>` : ''}${x.family ? `<span>🌳 ${esc(x.family)}</span>` : ''}</div>
        ${x.note ? `<div class="fb-note">💡 ${esc(x.note)}</div>` : ''}
      </div></div></div>`;
  },

  flash(c, list) {
    let i = 0, deck = [...list], reverse = false;
    modal({
      title: '🃏 Lật thẻ', full: true, cls: 'flash-modal',
      body: `<div class="fl-top"><span id="flPos"></span><span class="grow"></span><button class="btn sm" id="flShuf">🔀 Trộn</button><button class="btn sm" id="flRev">⇄ Nghĩa → Từ</button><button class="btn sm" id="flSay">🔊 Đọc</button></div>
        <div class="fl-stage" id="flStage"></div>
        <div class="fl-nav"><button class="btn big" id="flPrev">‹ Trước</button><button class="btn big pri" id="flFlip">Lật ⟲</button><button class="btn big" id="flNext">Sau ›</button></div>
        <p class="muted center">Phím: ← → để chuyển · Space để lật · S để đọc</p>`,
      onOpen: (w, close) => {
        const draw = () => {
          const x = deck[i];
          $('#flPos', w).textContent = `${i + 1} / ${deck.length}`;
          let h = this.cardFace(x, c);
          if (reverse) h = h.replace('<div class="face front">', `<div class="face front"><div class="fc-word sm">${esc(x.meaning || x.def)}</div><div class="fc-hint">từ này là gì?</div></div><div class="face front" hidden>`);
          $('#flStage', w).innerHTML = h;
          $('.flip', w).onclick = () => $('.flip', w).classList.toggle('flipped');
        };
        draw();
        const go = d => { i = (i + d + deck.length) % deck.length; draw(); };
        $('#flPrev', w).onclick = () => go(-1); $('#flNext', w).onclick = () => go(1);
        $('#flFlip', w).onclick = () => $('.flip', w).classList.toggle('flipped');
        $('#flShuf', w).onclick = () => { deck = shuffle(deck); i = 0; draw(); };
        $('#flRev', w).onclick = e => { reverse = !reverse; e.target.classList.toggle('on', reverse); draw(); };
        $('#flSay', w).onclick = () => Speech.speak(deck[i].word, c.lang);
        const k = e => {
          if (!document.body.contains(w)) return document.removeEventListener('keydown', k);
          if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1);
          if (e.key === ' ') { e.preventDefault(); $('.flip', w).classList.toggle('flipped'); }
          if (e.key === 's') Speech.speak(deck[i].word, c.lang);
        };
        document.addEventListener('keydown', k);
      }
    });
  },

  bulk(c, sc, after) {
    modal({
      title: '⚡ Thêm hàng loạt', wide: true,
      body: `<p class="muted">Mỗi dòng một từ. Có thể thêm nghĩa sau dấu <code>|</code> hoặc <code>-</code> (vd: <code>serendipity | sự tình cờ may mắn</code>). Bấm “AI điền” để tự động bổ sung mọi trường còn thiếu. Cũng có thể dán một mảng JSON <code>[{"word":…,"ipa":…,"pos":…,"meaning":…,"def":…,"usage":…,"examples":[{"s":…,"t":…}],"syn":…,"ant":…}]</code> để nhập đầy đủ các trường.</p>
        <textarea class="inp" id="bk" rows="12" placeholder="ephemeral\nubiquitous | có mặt khắp nơi\n..."></textarea>
        <p class="muted sm">Dán thẳng từ <b>Anki</b> / <b>Quizlet</b> (mỗi dòng: <code>từ⇥nghĩa⇥cách đọc⇥ví dụ</code>, ngăn cách bằng Tab) cũng được.</p>
        <label class="row"><input type="checkbox" id="bkDict" checked> 📖 Tra từ điển miễn phí cho phần còn thiếu (không cần AI)</label>
        <label class="row"><input type="checkbox" id="bkAi" ${AI.ready() ? '' : 'disabled'}> ✦ Dùng AI điền thêm (lưu ý cách dùng, collocation…)</label>
        <div id="bkProg" class="muted"></div>`,
      actions: [{ label: 'Thêm', cls: 'pri', onClick: async (w) => {
        const raw = $('#bk', w).value.trim();
        if (raw.startsWith('[')) {
          let arr;
          try { arr = JSON.parse(raw); } catch (e) { toast('JSON chưa đúng: ' + e.message, 'err', 5000); return false; }
          arr.forEach(o => Store.list('cards').unshift({ id: uid(), courseId: c.id, bookId: sc.bookId, unitId: sc.unitId, part: sc.part, created: Date.now(), tags: o.tags || [], word: o.word || '', ipa: o.ipa || '', pos: o.pos || '', meaning: o.meaning || '', def: o.def || '', usage: o.usage || '', examples: o.examples || [], syn: o.syn || '', ant: o.ant || '', coll: o.coll || '', family: o.family || '', note: o.note || '' }));
          Store.save('cards'); Activity.add('card', arr.length); this.track(c.id, 'cards', arr.length);
          toast(`Đã thêm ${arr.length} thẻ 🃏`); after && after();
          return;
        }
        const lines = $('#bk', w).value.split('\n').map(l => l.trim()).filter(Boolean);
        if (!lines.length) return false;
        const items = lines.map(l => {
          let a, b, r, ex;
          if (l.includes('\t')) [a, b, r, ex] = l.split('\t');
          else [a, b] = l.split(/\s[|\-–]\s|\|/);
          const strip = t => (t || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          return { id: uid(), courseId: c.id, bookId: sc.bookId, unitId: sc.unitId, part: sc.part, word: strip(a), meaning: strip(b), ipa: strip(r), examples: ex ? [{ s: strip(ex), t: '' }] : [], tags: [] };
        }).filter(it => it.word);
        if ($('#bkDict', w).checked) {
          const prog = $('#bkProg', w);
          for (let k = 0; k < items.length; k++) {
            const it = items[k]; prog.textContent = `📖 Đang tra ${k + 1}/${items.length}: ${it.word}…`;
            try { const o = await Dict.lookup(it.word, c.lang); Object.keys(o).forEach(key => { if (!it[key] || (Array.isArray(it[key]) && !it[key].length)) it[key] = o[key]; }); } catch (_) { }
          }
          prog.textContent = '';
        }
        if ($('#bkAi', w).checked && AI.ready()) {
          const prog = $('#bkProg', w);
          for (let k = 0; k < items.length; k += 15) {
            prog.textContent = `✦ AI đang điền ${k + 1}–${Math.min(items.length, k + 15)} / ${items.length}…`;
            try {
              const chunk = items.slice(k, k + 15);
              const o = await AI.json({ prompt: `Ngôn ngữ: ${c.name} (${c.lang}). Với từng từ trong danh sách ${JSON.stringify(chunk.map(x => x.word))}, trả về {"cards":[{"word":"","ipa":"","pos":"(${POS.join('/')})","meaning":"nghĩa tiếng Việt","def":"định nghĩa ngắn bằng ngôn ngữ đích","usage":"lưu ý cách dùng (tiếng Việt, có thể rỗng)","examples":[{"s":"","t":""}],"syn":"","ant":""}]} theo đúng thứ tự, mỗi từ 2 ví dụ.`, maxTokens: 8000 });
              (o.cards || []).forEach((r, j) => { const it = chunk[j]; if (!it) return; Object.keys(r).forEach(key => { if (key !== 'word' && (!it[key] || (Array.isArray(it[key]) && !it[key].length))) it[key] = r[key]; }); });
            } catch (e) { toast('AI lỗi ở một nhóm: ' + e.message, 'err'); }
          }
        }
        items.forEach(it => Store.list('cards').unshift({ ...it, created: Date.now() }));
        Store.save('cards'); Activity.add('card', items.length); this.track(c.id, 'cards', items.length);
        toast(`Đã thêm ${items.length} thẻ 🃏`); after && after();
      } }]
    });
  },

  /* ---------- ÔN TẬP SRS ---------- */
  review(el, c, sc) {
    const S = Store.settings(); S.newPerDay = S.newPerDay || 20;
    const all = this.cardsIn(c.id, sc);
    const due = all.filter(x => x.seen && (x.due || 0) <= Date.now());
    const fresh = all.filter(x => !x.seen).slice(0, S.newPerDay);
    let queue = shuffle([...due, ...fresh]), mode = 'flip', done = 0, again = 0;
    el.innerHTML = `
      <div class="rv-head">
        <div class="rv-stat"><b>${due.length}</b><span>đến hạn</span></div><div class="rv-stat"><b>${fresh.length}</b><span>thẻ mới</span></div><div class="rv-stat"><b id="rvDone">0</b><span>đã ôn</span></div>
        <span class="grow"></span>
        <div class="seg" id="rvMode"><button data-m="flip" class="on">🃏 Lật thẻ</button><button data-m="type">⌨ Gõ đáp án</button><button data-m="listen">🎧 Nghe → nghĩa</button><button data-m="cloze">✍️ Điền chỗ trống</button><button data-m="speak">🎙 Luyện nói</button></div>
        <label class="rlbl">Thẻ mới/ngày <input type="number" class="inp sm" id="rvNew" value="${S.newPerDay}" style="width:64px"></label>
      </div>
      <div class="rv-stage" id="rv"></div>`;
    $('#rvNew').onchange = e => { S.newPerDay = +e.target.value; Store.save('settings'); };
    $$('#rvMode button').forEach(b => b.onclick = () => { mode = b.dataset.m; $$('#rvMode button').forEach(x => x.classList.toggle('on', x === b)); show(); });
    const show = () => {
      const st = $('#rv'); if (!st) return;
      if (!queue.length) {
        st.innerHTML = `<div class="empty big">${Art.creature(Pet.form(), { size: 130, mood: 'star' })}<h2>Xong buổi ôn! 🎉</h2><p>Đã ôn ${done} thẻ${again ? `, ${again} lần “Quên”` : ''}. Chữ-tchi no căng bụng rồi.</p></div>`;
        if (done) Sfx.jingle(); return;
      }
      const x = queue[0];
      const btns = `<div class="rv-grade">${[[0, 'Quên', 'again'], [3, 'Khó', 'hard'], [4, 'Được', 'good'], [5, 'Dễ', 'easy']].map(([q, l, k]) => `<button class="g-${k}" data-q="${q}"><b>${l}</b><small>${SRS.preview(x, q).label}</small></button>`).join('')}</div>`;
      const m = mode === 'cloze' && !clozeOf(x) ? 'type' : mode;   // thẻ chưa có câu ví dụ thì gõ đáp án
      if (m === 'flip') {
        st.innerHTML = this.cardFace(x, c) + `<div class="rv-show"><button class="btn big pri" id="rvShow">Hiện đáp án (Space)</button></div><div class="rv-btns" hidden>${btns}</div>`;
        const reveal = () => { $('.flip', st).classList.add('flipped'); $('.rv-show', st).hidden = true; $('.rv-btns', st).hidden = false; };
        $('#rvShow').onclick = reveal; $('.flip', st).onclick = reveal;
      } else if (m === 'type') {
        st.innerHTML = `<div class="rv-q"><div class="fc-word sm">${esc(x.meaning || x.def)}</div>${x.pos ? `<div class="fc-pos">${esc(x.pos)}</div>` : ''}${x.examples?.[0] ? `<div class="vc-ex">${esc(x.examples[0].s.replace(new RegExp(x.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '____'))}</div>` : ''}
          <input class="inp big-word" id="rvIn" placeholder="Gõ từ…" autocomplete="off"><button class="btn pri" id="rvCheck">Kiểm tra ↵</button><div id="rvRes"></div></div><div class="rv-btns" hidden>${btns}</div>`;
        const inp = $('#rvIn'); inp.focus();
        const check = () => { const ok = answerOk(inp.value, x) || judgeCard(inp.value, x).near; $('#rvRes').innerHTML = (ok ? '<b class="ok">✓ Chính xác!</b> ' : `<b class="bad">✗</b> Đáp án: `) + `<b>${esc(x.word)}</b> ${esc(x.ipa || '')}`; Speech.speak(x.word, c.lang); $('.rv-btns', st).hidden = false; if (!ok) $('.g-again', st).classList.add('suggest'); else $('.g-good', st).classList.add('suggest'); };
        $('#rvCheck').onclick = check; inp.onkeydown = e => { if (e.key === 'Enter') { e.stopPropagation(); check(); } };
      } else if (m === 'cloze') {
        const cz = clozeOf(x);
        st.innerHTML = `<div class="rv-q"><div class="cz-sent">${esc(cz.before)}<input class="cz-in" id="rvIn" autocomplete="off" size="${Math.max(4, cz.hidden.length + 2)}" placeholder="?">${esc(cz.after)}</div>
          ${cz.t ? `<div class="muted">${esc(cz.t)}</div>` : ''}<div class="fc-pos">gợi ý: ${esc(x.meaning || x.def || '')}</div>
          <button class="btn pri" id="rvCheck">Kiểm tra ↵</button><div id="rvRes"></div></div><div class="rv-btns" hidden>${btns}</div>`;
        const inp = $('#rvIn'); inp.focus();
        const check = () => {
          const ok = normAns(inp.value) === normAns(cz.hidden) || answerOk(inp.value, x);
          inp.classList.add(ok ? 'ok' : 'bad'); inp.value = cz.hidden; inp.readOnly = true;
          $('#rvRes').innerHTML = (ok ? '<b class="ok">✓ Chính xác!</b>' : `<b class="bad">✗ Đáp án:</b> <b>${esc(cz.hidden)}</b>`) + ` · ${rubyWord(x, c)} ${esc(x.ipa || '')}`;
          Speech.speak(cz.before + cz.hidden + cz.after, c.lang, .95);
          $('.rv-btns', st).hidden = false; $(ok ? '.g-good' : '.g-again', st).classList.add('suggest');
        };
        $('#rvCheck').onclick = check; inp.onkeydown = e => { if (e.key === 'Enter') { e.stopPropagation(); check(); } };
      } else if (m === 'speak') {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        const target = x.word;
        st.innerHTML = `<div class="rv-q"><div class="fc-word">${rubyWord(x, c)}</div><div class="muted">${esc(x.meaning || '')}</div>
          <div class="row center"><button class="btn" id="rvPlay">🔊 Nghe mẫu</button><button class="btn pri big" id="rvMic">🎙 Bấm rồi nói</button></div>
          <div id="rvRes" class="sp-res">${SR ? '' : '<p class="bad">Trình duyệt này không nhận dạng giọng nói (dùng Chrome hoặc Edge).</p>'}</div></div><div class="rv-btns" hidden>${btns}</div>`;
        $('#rvPlay').onclick = () => Speech.speak(target, c.lang, .85);
        $('#rvMic').onclick = () => {
          if (!SR) return;
          const r = new SR(); r.lang = c.lang; r.interimResults = false; r.maxAlternatives = 5;
          $('#rvMic').innerHTML = '👂 Đang nghe…'; $('#rvMic').disabled = true;
          r.onresult = ev => {
            const alts = [...ev.results[0]].map(a => a.transcript);
            const best = Math.max(...alts.map(a => Math.max(similarity(a, target), ...(x.ipa || '').split(/[\/／,、]/).map(rd => similarity(a, rd)))));
            const heard = alts[0];
            $('#rvRes').innerHTML = `<div class="d-res"><div class="d-score ${best >= 80 ? 'good' : ''}">${best}%</div><div>Máy nghe được: <b>${esc(heard)}</b><br><span class="muted">${best >= 80 ? 'Phát âm rõ ràng!' : best >= 50 ? 'Gần đúng rồi, nghe mẫu rồi thử lại nhé.' : 'Chưa khớp, nghe mẫu và nói chậm hơn.'}</span></div></div>`;
            $('.rv-btns', st).hidden = false; $(best >= 80 ? '.g-good' : best >= 50 ? '.g-hard' : '.g-again', st).classList.add('suggest');
          };
          r.onerror = ev => { $('#rvRes').innerHTML = `<p class="bad">Không nghe được (${esc(ev.error)}). Kiểm tra quyền micro.</p>`; $('.rv-btns', st).hidden = false; };
          r.onend = () => { const m = $('#rvMic'); if (m) { m.innerHTML = '🎙 Nói lại'; m.disabled = false; } };
          r.start();
        };
      } else {
        st.innerHTML = `<div class="rv-q"><button class="btn big" id="rvPlay">🔊 Nghe lại</button><p class="muted">Nghe và nhớ nghĩa, rồi bấm hiện đáp án.</p><button class="btn pri" id="rvShow">Hiện đáp án</button><div id="rvRes"></div></div><div class="rv-btns" hidden>${btns}</div>`;
        const play = () => Speech.speak(x.word, c.lang); play(); $('#rvPlay').onclick = play;
        $('#rvShow').onclick = () => { $('#rvRes').innerHTML = this.cardFace(x, c); $('#rvRes .flip').classList.add('flipped'); $('.rv-btns', st).hidden = false; };
      }
      $$('.rv-grade button', st).forEach(b => b.onclick = () => grade(+b.dataset.q));
    };
    const grade = q => {
      const x = queue.shift(); SRS.grade(x, q); done++; $('#rvDone').textContent = done;
      if (q < 3) { again++; queue.splice(Math.min(queue.length, 3), 0, x); }
      Sfx.beep(q < 3 ? 300 : 700 + q * 60, .07); show();
    };
    const key = e => {
      if (!document.body.contains(el) || !$('#rv')) return document.removeEventListener('keydown', key);
      if (e.target.closest('input,textarea')) return;
      const vis = $('.rv-btns') && !$('.rv-btns').hidden;
      if (e.key === ' ' && mode === 'flip' && !vis) { e.preventDefault(); $('#rvShow')?.click(); }
      if (vis && ['1', '2', '3', '4'].includes(e.key)) grade([0, 3, 4, 5][+e.key - 1]);
    };
    document.addEventListener('keydown', key);
    show();
  },

  /* ---------- NGHE CHÉP ---------- */
  dictation(el, c, sc) {
    const cs = this.cardsIn(c.id, sc);
    let src = 'sent', rate = .9, list = [], i = 0, score = 0;
    el.innerHTML = `
      <div class="filter-row">
        <div class="seg" id="dSrc"><button data-s="word">Từ đơn</button><button data-s="sent" class="on">Câu ví dụ</button><button data-s="custom">Đoạn tự nhập</button></div>
        <label class="rlbl">Tốc độ <input type="range" min=".5" max="1.3" step=".1" value=".9" id="dRate"> <b id="dRateV">0.9×</b></label>
        <button class="btn" id="dStart">▶ Bắt đầu</button>
      </div>
      <textarea class="inp" id="dCustom" rows="4" hidden placeholder="Dán đoạn văn — sẽ được tách thành từng câu để chép…"></textarea>
      <div class="dict" id="dict"><div class="empty">${Art.creature('note', { size: 100, mood: 'joy' })}<p>Chọn nguồn rồi bấm ▶ Bắt đầu. Nghe → gõ lại → so sánh từng chữ.</p></div></div>`;
    $$('#dSrc button').forEach(b => b.onclick = () => { src = b.dataset.s; $$('#dSrc button').forEach(x => x.classList.toggle('on', x === b)); $('#dCustom').hidden = src !== 'custom'; });
    $('#dRate').oninput = e => { rate = +e.target.value; $('#dRateV').textContent = rate + '×'; };
    $('#dStart').onclick = () => {
      if (src === 'word') list = shuffle(cs.map(x => ({ t: x.word, hint: x.meaning, alts: cardForms(x) })));
      if (src === 'sent') list = shuffle(cs.flatMap(x => (x.examples || []).map(e => ({ t: e.s, hint: e.t }))));
      if (src === 'custom') list = ($('#dCustom').value.match(/[^.!?。！？]+[.!?。！？]?/g) || []).map(s => ({ t: s.trim() })).filter(s => s.t);
      if (!list.length) return toast('Không có nội dung để chép trong phạm vi này', 'err');
      i = 0; score = 0; show();
    };
    const norm = s => s.toLowerCase().replace(/[.,!?;:"“”'’()。、！？]/g, '').replace(/\s+/g, ' ').trim();
    const show = () => {
      const d = $('#dict');
      if (i >= list.length) { d.innerHTML = `<div class="empty big">${Art.creature('note', { size: 120, mood: 'star' })}<h2>Hoàn thành!</h2><p>Điểm trung bình: <b>${Math.round(score / list.length)}%</b></p></div>`; return; }
      const it = list[i];
      d.innerHTML = `<div class="d-card"><div class="d-top"><span>Câu ${i + 1}/${list.length}</span><span class="grow"></span><button class="btn" id="dPlay">🔊 Nghe</button><button class="btn" id="dSlow">🐢 Chậm</button>${it.hint ? `<button class="btn sm" id="dHint">💡 Gợi ý nghĩa</button>` : ''}</div>
        <textarea class="inp big" id="dIn" rows="3" placeholder="Gõ lại những gì bạn nghe…"></textarea>
        <div class="row"><button class="btn pri" id="dCheck">Kiểm tra (Ctrl+Enter)</button><button class="btn" id="dSkip">Bỏ qua</button></div>
        <div id="dRes"></div></div>`;
      const play = r => Speech.speak(it.t, c.lang, r);
      setTimeout(() => play(rate), 200);
      $('#dPlay').onclick = () => play(rate); $('#dSlow').onclick = () => play(.6);
      $('#dHint') && ($('#dHint').onclick = e => { e.target.outerHTML = `<span class="tag">${esc(it.hint)}</span>`; });
      $('#dSkip').onclick = () => { i++; show(); };
      const check = () => {
        const typed = $('#dIn').value;
        const spaced = !isJa(c) && /\s/.test(it.t.trim());
        let pct, html;
        if (spaced) {
          const a = it.t.split(/\s+/).filter(Boolean), b = new Set(typed.split(/\s+/).map(normAns));
          let ok = 0;
          html = a.map(w => { const hit = !normAns(w) || b.has(normAns(w)); if (hit) ok++; return `<span class="${hit ? 'd-ok' : 'd-bad'}">${esc(w)}</span>`; }).join(' ');
          pct = Math.max(Math.round(ok / a.length * 100), judgeAns(typed, [it.t]).pct);
        } else {
          const j = judgeAns(typed, it.alts || [it.t]); pct = j.pct;
          html = j.ok ? `<span class="d-ok">${esc(it.t)}</span>` : charDiff(typed, it.t);
        }
        const verdict = pct === 100 ? '<b class="ok">✓ Chính xác!</b> <small class="muted">(đã bỏ qua khác biệt ngoặc, khoảng trắng, katakana/hiragana)</small>' : pct >= 85 ? '<b class="near">≈ Gần đúng</b> — chỉ lệch một chút, xem chữ đỏ' : pct >= 50 ? '<b class="bad">Còn thiếu vài chỗ</b>' : '<b class="bad">✗ Nghe lại nhé</b>';
        score += pct; Activity.add('dictation'); if (pct >= 80) Lang.track(c.id, 'dict');
        $('#dRes').innerHTML = `<div class="d-res"><div class="d-score ${pct >= 85 ? 'good' : ''}">${pct}%</div><div><div>${verdict}</div><div class="d-ans">${html}</div><div class="muted">Bạn gõ: ${esc(typed)}</div>${it.hint ? `<div class="muted">Nghĩa: ${esc(it.hint)}</div>` : ''}</div></div><button class="btn pri" id="dNext">Tiếp ›</button>`;
        $('#dNext').onclick = () => { i++; show(); };
      };
      $('#dCheck').onclick = check;
      $('#dIn').onkeydown = e => { if (e.key === 'Enter' && e.ctrlKey) check(); };
      $('#dIn').focus();
    };
  },

  /* ---------- TRÒ CHƠI ---------- */
  games(el, c, sc) {
    const cs = this.cardsIn(c.id, sc).filter(x => x.meaning || x.def);
    const mean = x => x.meaning || x.def;
    el.innerHTML = `<div class="game-pick">
      ${[['match', '🧩 Ghép cặp', 'Lật ô tìm cặp từ ↔ nghĩa', 'tomato'], ['quiz', '⚡ Trắc nghiệm', '3 quả trứng = 3 mạng', 'star'], ['scramble', '🔤 Xếp chữ', 'Sắp lại chữ cái bị xáo', 'pencil'], ['rain', '🌧️ Mưa từ', 'Gõ từ trước khi nghĩa rơi xuống đất', 'cloud']]
        .map(g => `<button class="gp" data-g="${g[0]}">${Art.creature(g[3], { size: 64, mood: 'joy' })}<b>${g[1]}</b><small>${g[2]}</small></button>`).join('')}
      </div><div class="game-stage" id="gs"></div>`;
    const stage = $('#gs');
    this._gameStop && this._gameStop(); this._gameStop = null;
    $$('.gp', el).forEach(b => b.onclick = () => {
      if (cs.length < 4) return toast('Cần ít nhất 4 thẻ có nghĩa trong phạm vi', 'err');
      this._gameStop && this._gameStop(); this._gameStop = null;
      ({ match, quiz, scramble, rain })[b.dataset.g]();
    });
    const win = (msg, n = 3) => { Sfx.jingle(); Activity.add('game', n); Lang.track(c.id, 'games'); stage.innerHTML = `<div class="empty big">${Art.creature('tomato', { size: 110, mood: 'star' })}<h2>${msg}</h2><p>Chọn trò khác hoặc chơi lại nhé!</p></div>`; };

    function match() {
      const pick = shuffle(cs).slice(0, 6);
      const tiles = shuffle(pick.flatMap(x => [{ id: x.id, t: x.word, k: 'w' }, { id: x.id, t: mean(x), k: 'm' }]));
      let open = [], found = 0, moves = 0; const t0 = Date.now();
      stage.innerHTML = `<div class="g-info">Lượt: <b id="mMoves">0</b></div><div class="match-grid">${tiles.map((t, i) => `<button class="mt k-${t.k}" data-i="${i}"><span>${esc(t.t)}</span></button>`).join('')}</div>`;
      $$('.mt', stage).forEach(b => b.onclick = () => {
        if (b.classList.contains('open') || open.length === 2) return;
        b.classList.add('open'); open.push(b); Sfx.click();
        if (open.length === 2) {
          moves++; $('#mMoves').textContent = moves;
          const [a, d] = open.map(x => tiles[+x.dataset.i]);
          if (a.id === d.id && a.k !== d.k) { open.forEach(x => x.classList.add('done')); open = []; found++; Sfx.beep(880); if (found === pick.length) setTimeout(() => win(`Ghép xong trong ${moves} lượt, ${Math.round((Date.now() - t0) / 1000)} giây!`), 400); }
          else setTimeout(() => { open.forEach(x => x.classList.remove('open')); open = []; }, 800);
        }
      });
    }
    function quiz() {
      let lives = 3, n = 0, right = 0; const qs = shuffle(cs).slice(0, 12);
      const next = () => {
        if (lives <= 0 || n >= qs.length) return win(`Đúng ${right}/${n} câu!`, right);
        const x = qs[n]; const rev = Math.random() < .5;
        const opts = shuffle([x, ...shuffle(cs.filter(y => y.id !== x.id)).slice(0, 3)]);
        stage.innerHTML = `<div class="g-info">${'🥚'.repeat(lives)}<span class="muted">${'🥚'.repeat(3 - lives).replace(/🥚/g, '💥')}</span> · Câu ${n + 1}/${qs.length}</div>
          <div class="quiz-q">${esc(rev ? mean(x) : x.word)}</div>
          <div class="quiz-opts">${opts.map(o => `<button data-id="${o.id}">${esc(rev ? o.word : mean(o))}</button>`).join('')}</div>`;
        if (!rev) Speech.speak(x.word, c.lang);
        $$('.quiz-opts button', stage).forEach(b => b.onclick = () => {
          const ok = b.dataset.id === x.id; n++;
          b.classList.add(ok ? 'ok' : 'bad'); $(`.quiz-opts [data-id="${x.id}"]`, stage).classList.add('ok');
          if (ok) { right++; Sfx.beep(988); } else { lives--; Sfx.beep(220, .2); }
          setTimeout(next, ok ? 500 : 1200);
        });
      };
      next();
    }
    function scramble() {
      const qs = shuffle(cs.filter(x => x.word.length <= 16)).slice(0, 8); let n = 0, right = 0;
      const next = () => {
        if (n >= qs.length) return win(`Xếp đúng ${right}/${qs.length} từ!`, right);
        const x = qs[n]; let built = '';
        const letters = shuffle([...x.word]);
        stage.innerHTML = `<div class="g-info">Từ ${n + 1}/${qs.length}</div><div class="quiz-q sm">${esc(mean(x))}</div><div class="sc-built" id="scB">&nbsp;</div>
          <div class="sc-letters">${letters.map((l, i) => `<button data-i="${i}">${l === ' ' ? '␣' : esc(l)}</button>`).join('')}</div>
          <div class="row center"><button class="btn" id="scR">↺ Làm lại</button><button class="btn" id="scS">Bỏ qua</button></div>`;
        $$('.sc-letters button', stage).forEach(b => b.onclick = () => {
          b.disabled = true; built += letters[+b.dataset.i]; $('#scB').textContent = built; Sfx.click();
          if (built.length === x.word.length) {
            const ok = built.toLowerCase() === x.word.toLowerCase(); if (ok) right++;
            $('#scB').innerHTML = ok ? `<span class="ok">✓ ${esc(x.word)}</span>` : `<span class="bad">✗ ${esc(built)}</span> → <b>${esc(x.word)}</b>`;
            Speech.speak(x.word, c.lang); n++; setTimeout(next, ok ? 900 : 1700);
          }
        });
        $('#scR').onclick = () => { built = ''; $('#scB').innerHTML = '&nbsp;'; $$('.sc-letters button', stage).forEach(b => b.disabled = false); };
        $('#scS').onclick = () => { n++; next(); };
      };
      next();
    }
    function rain() {
      let score = 0, lives = 3, drops = [], last = 0, raf, speed = .35, spawnEvery = 2600;
      stage.innerHTML = `<div class="g-info">Điểm <b id="rS">0</b> · ${'<span class="rl">🥚</span>'.repeat(3)}</div><div class="rain" id="rain"><div class="rain-ground">${Art.deco.flower(30)}${Art.deco.flower(30, '#ff8fc8')}${Art.deco.flower(30, '#7ec8ff')}</div></div><input class="inp big-word" id="rIn" placeholder="Gõ từ tương ứng rồi Enter…" autocomplete="off">`;
      const box = $('#rain'); $('#rIn').focus();
      const spawn = () => { const x = cs[Math.floor(Math.random() * cs.length)]; const d = document.createElement('div'); d.className = 'drop'; d.innerHTML = `${Art.creature('cloud', { size: 30 })}<span>${esc(mean(x))}</span>`; d.style.left = (5 + Math.random() * 70) + '%'; box.appendChild(d); drops.push({ x, d, y: 0 }); };
      const loop = ts => {
        if (!document.body.contains(box)) return;
        if (ts - last > spawnEvery) { spawn(); last = ts; spawnEvery = Math.max(1100, spawnEvery - 60); speed += .006; }
        const H = box.clientHeight - 40;
        drops.forEach(o => { o.y += speed; o.d.style.top = o.y + 'px'; if (o.y > H) { o.d.remove(); o.dead = true; lives--; Sfx.beep(200, .2); $$('.rl', stage)[lives]?.classList.add('lost'); } });
        drops = drops.filter(o => !o.dead);
        if (lives <= 0) { cancelAnimationFrame(raf); return win(`Mưa tạnh! Bạn được ${score} điểm`, Math.ceil(score / 3)); }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      $('#rIn').onkeydown = e => {
        if (e.key !== 'Enter') return;
        const v = e.target.value.trim().toLowerCase(); e.target.value = '';
        const hit = drops.find(o => o.x.word.toLowerCase() === v);
        if (hit) { hit.d.classList.add('pop'); setTimeout(() => hit.d.remove(), 300); drops = drops.filter(o => o !== hit); score++; $('#rS').textContent = score; Sfx.beep(1046); }
        else Sfx.beep(260, .08);
      };
      Lang._gameStop = () => cancelAnimationFrame(raf);
    }
  },

  /* ---------- NGỮ PHÁP ---------- */
  grammar(el, c, sc, rerender) {
    const list = Store.list('grammar').filter(g => g.courseId === c.id && (!sc.bookId || g.bookId === sc.bookId) && (!sc.unitId || g.unitId === sc.unitId) && (!sc.part || g.part === sc.part));
    const GS = { new: ['mới', ''], due: ['đến hạn ôn', 'due'], learning: ['đang nhớ', 'lrn'], mature: ['nhớ lâu', 'ok'] };
    el.innerHTML = this.gramBar(c, sc) + `<div class="filter-row"><button class="btn pri" id="gAdd">＋ Điểm ngữ pháp mới</button><button class="btn" id="gAiNew">✦ AI soạn điểm ngữ pháp</button></div>
      <div class="gram-list">${list.map(g => `<div class="gram-card" data-id="${g.id}"><div class="gc-title">${esc(g.title)}</div>${g.form ? `<div class="gc-form">${esc(g.form)}</div>` : ''}<p class="muted">${esc(stripHtml((g.content || '').replace(/<h\d[^>]*>[\s\S]*?<\/h\d>/gi, ' ').replace(/<\/(p|li|div|tr)>|<br\s*\/?>/gi, ' ')).replace(/\s+/g, ' ').trim().slice(0, 160))}…</p><div class="pc-foot"><span class="gs-tag ${GS[this.gramState(g)][1]}">${GS[this.gramState(g)][0]}</span><span>${g.exercises?.length ? `📝 ${g.exercises.length} bài tập` : ''}</span><span class="grow"></span><button class="mini-btn" data-practice="${g.id}">Luyện</button></div></div>`).join('') || `<div class="empty big">${Art.creature('prof', { size: 100 })}<p>Chưa có điểm ngữ pháp nào trong phạm vi.</p></div>`}</div>`;
    this.bindGramBar(c, sc, el, rerender);
    $('#gAdd').onclick = () => this.gramForm(c, sc, null, rerender);
    $('#gAiNew').onclick = async e => {
      const topic = await promptBox('Chủ điểm ngữ pháp?', '', 'vd: thì hiện tại hoàn thành / ～てしまう / subjonctif'); if (!topic) return;
      const o = await AI.withSpinner(e.target, () => AI.json({ prompt: `Soạn bài ngữ pháp ${c.name} về "${topic}" cho người Việt. Trả về {"title":"","form":"công thức cấu trúc","explain":"giải thích chi tiết bằng tiếng Việt (nhiều đoạn, ngăn bởi \\n\\n)","usage":["cách dùng 1","cách dùng 2"],"examples":[{"s":"","t":""}],"pitfalls":["lỗi hay gặp"],"compare":"so sánh với cấu trúc dễ nhầm"}`, maxTokens: 6000, effort: 'medium' }));
      if (!o) return;
      const html = `<h3>Giải thích</h3>${(o.explain || '').split(/\n{2,}/).map(p => `<p>${esc(p)}</p>`).join('')}<h3>Cách dùng</h3><ul>${(o.usage || []).map(u => `<li>${esc(u)}</li>`).join('')}</ul><h3>Ví dụ</h3><div class="blk bilingual"><div class="bl-l"><small>Câu</small>${(o.examples || []).map(e => `<p>${esc(e.s)}</p>`).join('')}</div><div class="bl-r"><small>Dịch</small>${(o.examples || []).map(e => `<p>${esc(e.t)}</p>`).join('')}</div></div><div class="blk callout c-warn"><span class="ci" contenteditable="false">⚠️</span><div><b>Lỗi hay gặp:</b><ul>${(o.pitfalls || []).map(p => `<li>${esc(p)}</li>`).join('')}</ul></div></div>${o.compare ? `<div class="blk callout c-key"><span class="ci" contenteditable="false">🔑</span><div>${esc(o.compare)}</div></div>` : ''}`;
      const g = { id: uid(), courseId: c.id, bookId: sc.bookId, unitId: sc.unitId, part: sc.part, title: o.title || topic, form: o.form || '', content: html };
      Store.upsert('grammar', g); rerender(); this.gramForm(c, sc, g, rerender);
    };
    $$('.gram-card', el).forEach(d => d.onclick = e => { const g = Store.find('grammar', d.dataset.id); if (e.target.dataset.practice) this.practice(c, g); else this.gramForm(c, sc, g, rerender); });
  },
  gramForm(c, sc, g, after) {
    g = g || { id: uid(), courseId: c.id, bookId: sc.bookId, unitId: sc.unitId, part: sc.part, title: '', form: '', content: '' };
    let ed;
    modal({
      title: '📐 Điểm ngữ pháp', full: true,
      body: `<input class="inp big-word" id="gT" value="${esc(g.title)}" placeholder="Tên điểm ngữ pháp">
        <input class="inp formula" id="gF" value="${esc(g.form)}" placeholder="Công thức: S + have/has + V3 …">
        <div class="row"><button class="btn sm" id="gExplain">✦ AI giải thích thêm</button><button class="btn sm" id="gMine">✦ Chữa câu tôi tự đặt</button><button class="btn sm pri" id="gPrac">📝 Luyện tập</button></div>
        <div id="gEd"></div>`,
      onOpen: w => {
        ed = Editor.mount($('#gEd', w), { html: g.content || `<h3>Giải thích</h3><p>…</p><h3>Ví dụ</h3>${Blocks.bilingual()}`, context: () => `Ngữ pháp ${c.name}: ${$('#gT', w).value}` });
        $('#gExplain', w).onclick = async e => { const o = await AI.withSpinner(e.currentTarget, () => AI.ask({ prompt: `Giải thích sâu hơn điểm ngữ pháp ${c.name} "${$('#gT', w).value}" (${$('#gF', w).value}) cho người Việt: sắc thái, so sánh với tiếng Việt, 5 ví dụ có dịch.`, effort: 'medium' })); if (o) ed.insert(`<div class="blk callout c-idea"><span class="ci" contenteditable="false">✦</span><div>${o.split(/\n{2,}/).map(p => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`).join('')}</div></div><p><br></p>`); };
        $('#gMine', w).onclick = async () => {
          const s = await promptBox('Viết câu của bạn dùng cấu trúc này'); if (!s) return;
          const o = await AI.withSpinner(null, () => AI.ask({ prompt: `Học viên viết câu ${c.name} dùng cấu trúc "${$('#gT', w).value}": "${s}". Chấm đúng/sai, sửa lại, giải thích ngắn bằng tiếng Việt, gợi ý 1 câu tự nhiên hơn.` }));
          if (o) ed.insert(`<div class="blk speech"><span class="sp-av" contenteditable="false">${Art.creature('prof', { size: 56 })}</span><div class="sp-b"><b>Câu của bạn:</b> ${esc(s)}<br>${esc(o).replace(/\n/g, '<br>')}</div></div><p><br></p>`);
        };
        $('#gPrac', w).onclick = () => { save(w); this.practice(c, g); };
      },
      actions: [{ label: '🗑 Xoá', cls: 'danger', onClick: async () => { if (await confirmBox('Xoá điểm ngữ pháp?')) { Store.remove('grammar', g.id); after && after(); } } }, { label: '💾 Lưu', cls: 'pri', onClick: w => { save(w); after && after(); } }]
    });
    const save = w => { g.title = $('#gT', w).value.trim() || 'Ngữ pháp'; g.form = $('#gF', w).value; g.content = ed.getHTML(); Store.upsert('grammar', g); };
  },
  async practice(c, g) {
    if (!g.exercises?.length) {
      if (!AI.ready()) return AI.needKey();
      toast('✦ AI đang soạn bài tập…');
      try {
        const o = await AI.json({ prompt: `Soạn 8 bài tập ${c.name} cho điểm ngữ pháp "${g.title}" (${g.form}). Nội dung tham khảo: """${stripHtml(g.content).slice(0, 4000)}""". Trộn dạng: "fill" (điền chỗ trống ___), "choose" (4 lựa chọn), "transform" (viết lại câu), "translate" (dịch từ tiếng Việt). Trả về {"exercises":[{"type":"fill|choose|transform|translate","q":"đề","options":["chỉ cho choose"],"answer":"đáp án","explain":"giải thích tiếng Việt ngắn"}]}`, maxTokens: 6000 });
        g.exercises = o.exercises || []; Store.upsert('grammar', g);
      } catch (e) { return toast('AI lỗi: ' + e.message, 'err'); }
    }
    let i = 0, right = 0;
    const m = modal({ title: '📝 Luyện: ' + esc(g.title), wide: true, body: '<div id="px"></div>', actions: [{ label: '↻ Soạn bộ mới (AI)', onClick: () => { g.exercises = []; this.practice(c, g); } }] });
    const show = () => {
      const box = $('#px', m.el); if (!box) return;
      if (i >= g.exercises.length) { box.innerHTML = `<div class="empty">${Art.creature('prof', { size: 90 })}<h2>${right}/${g.exercises.length} câu đúng</h2></div>`; Activity.add('grammar', right); Lang.track(c.id, 'grammar', right); return; }
      const x = g.exercises[i];
      box.innerHTML = `<div class="g-info">Câu ${i + 1}/${g.exercises.length} · <span class="tag">${x.type}</span></div><div class="px-q">${esc(x.q)}</div>
        ${x.type === 'choose' ? `<div class="quiz-opts">${(x.options || []).map(o => `<button>${esc(o)}</button>`).join('')}</div>` : `<textarea class="inp" id="pxIn" rows="2" placeholder="Câu trả lời…"></textarea><button class="btn pri" id="pxC">Kiểm tra</button>`}
        <div id="pxR"></div>`;
      const result = (ok, yours) => {
        if (ok) right++;
        $('#pxR', box).innerHTML = `<div class="px-r ${ok ? 'ok' : 'bad'}">${ok ? '✓ Đúng rồi!' : '✗ Chưa đúng'} — Đáp án: <b>${esc(x.answer)}</b><p>${esc(x.explain || '')}</p></div><button class="btn pri" id="pxN">Tiếp ›</button>`;
        $('#pxN', box).onclick = () => { i++; show(); };
      };
      if (x.type === 'choose') $$('.quiz-opts button', box).forEach(b => b.onclick = () => { const ok = norm(b.textContent) === norm(x.answer); b.classList.add(ok ? 'ok' : 'bad'); result(ok); });
      else $('#pxC', box).onclick = async e => {
        const v = $('#pxIn', box).value.trim(); if (!v) return;
        if (norm(v) === norm(x.answer)) return result(true);
        if (x.type === 'fill' || !AI.ready()) return result(false);
        const o = await AI.withSpinner(e.target, () => AI.json({ prompt: `Đề: ${x.q}\nĐáp án mẫu: ${x.answer}\nHọc viên trả lời: ${v}\nCâu trả lời có chấp nhận được không (đúng ngữ pháp và nghĩa)? Trả về {"ok":true/false,"comment":"nhận xét ngắn tiếng Việt"}` }));
        if (o) { x.explain = (o.comment || '') + (x.explain ? ' · ' + x.explain : ''); result(!!o.ok); }
      };
    };
    const norm = s => String(s).toLowerCase().replace(/[.,!?。]/g, '').replace(/\s+/g, ' ').trim();
    show();
  },

  /* ---------- GIA SƯ AI ---------- */
  tutor(el, c, sc) {
    const chats = Store.get('chat', {}); chats[c.id] = chats[c.id] || [];
    const hist = chats[c.id];
    const words = this.cardsIn(c.id, sc).slice(0, 40).map(x => x.word).join(', ');
    el.innerHTML = `<div class="tutor">
      <div class="chips">${[['💬 Trò chuyện tự do', `Hãy trò chuyện với tôi bằng ${c.name} về một chủ đề thú vị, mỗi lượt sửa lỗi cho tôi.`], ['🎭 Đóng vai: quán cà phê', `Đóng vai nhân viên quán cà phê nói ${c.name}. Bắt đầu đi.`], ['🧠 Kiểm tra từ của tôi', `Hãy kiểm tra tôi các từ sau từng cái một: ${words}`], ['✍️ Viết đoạn dùng từ mới', `Viết một đoạn văn ngắn ${c.name} dùng các từ: ${words.split(', ').slice(0, 8).join(', ')}, rồi hỏi tôi 3 câu đọc hiểu.`], ['📐 Giải thích ngữ pháp', 'Tôi muốn hỏi về ngữ pháp: ']].map(x => `<button class="chip" data-p="${esc(x[1])}">${x[0]}</button>`).join('')}<button class="chip" id="tClear">🗑 Xoá cuộc trò chuyện</button></div>
      <div class="chat big" id="tChat">${hist.length ? '' : `<div class="msg ai">${Art.creature('prof', { size: 40 })}<div>Chào bạn! Mình là thầy Ếch Kính. Hãy nói chuyện với mình bằng ${esc(c.name)} — mình sẽ sửa lỗi và giải thích bằng tiếng Việt nhé.</div></div>`}${hist.map(m => `<div class="msg ${m.role === 'user' ? 'me' : 'ai'}">${m.role === 'user' ? '' : Art.creature('prof', { size: 40 })}<div>${esc(m.content).replace(/\n/g, '<br>')}</div>${m.role !== 'user' ? `<button class="say" data-t="${esc(m.content)}">🔊</button>` : ''}</div>`).join('')}</div>
      <div class="chat-in"><button class="btn" id="tMic" title="Nói (nhận dạng giọng nói)">🎙</button><input class="inp" id="tIn" placeholder="Nhập bằng ${esc(c.name)} hoặc tiếng Việt…"><button class="btn pri" id="tSend">Gửi</button></div></div>`;
    const box = $('#tChat'); box.scrollTop = 1e9;
    const send = async text => {
      if (!text) return;
      hist.push({ role: 'user', content: text }); Store.save('chat');
      box.insertAdjacentHTML('beforeend', `<div class="msg me"><div>${esc(text)}</div></div>`); box.scrollTop = 1e9; $('#tIn').value = '';
      const out = await AI.withSpinner($('#tSend'), () => AI.ask({ system: `Bạn là "thầy Ếch Kính", gia sư ${c.name} vui tính cho người Việt. Trả lời chủ yếu bằng ${c.name} ở mức phù hợp; khi học viên mắc lỗi, thêm phần "✏️ Sửa:" giải thích ngắn bằng tiếng Việt. Ngắn gọn, khích lệ.`, messages: hist.slice(-20).map(m => ({ role: m.role, content: m.content })) }));
      if (out) { hist.push({ role: 'assistant', content: out }); Store.save('chat'); box.insertAdjacentHTML('beforeend', `<div class="msg ai">${Art.creature('prof', { size: 40 })}<div>${esc(out).replace(/\n/g, '<br>')}</div><button class="say" data-t="${esc(out)}">🔊</button></div>`); box.scrollTop = 1e9; Activity.add('tutor'); }
      else { hist.pop(); Store.save('chat'); }
    };
    $('#tSend').onclick = () => send($('#tIn').value.trim());
    $('#tIn').onkeydown = e => { if (e.key === 'Enter') send($('#tIn').value.trim()); };
    $$('.chip[data-p]', el).forEach(b => b.onclick = () => { if (b.dataset.p.endsWith(': ')) { $('#tIn').value = b.dataset.p; $('#tIn').focus(); } else send(b.dataset.p); });
    $('#tClear').onclick = async () => { if (await confirmBox('Xoá lịch sử trò chuyện?')) { chats[c.id] = []; Store.save('chat'); this.tutor(el, c, sc); } };
    box.onclick = e => { if (e.target.dataset.t) Speech.speak(e.target.dataset.t.replace(/✏️[\s\S]*/, ''), c.lang); };
    $('#tMic').onclick = () => {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SR) return toast('Trình duyệt không hỗ trợ nhận dạng giọng nói', 'err');
      const r = new SR(); r.lang = c.lang; r.onresult = e => { $('#tIn').value = e.results[0][0].transcript; }; r.start(); toast('🎙 Đang nghe…');
    };
  },

  /* ---------- THỐNG KÊ ---------- */
  stats(el, c, sc) {
    const cs = this.cardsIn(c.id, sc);
    const n = { new: 0, learning: 0, mature: 0 }; cs.forEach(x => n[SRS.state(x)]++);
    const days = [...Array(28)].map((_, i) => { const d = new Date(Date.now() - (27 - i) * DAY); d.setHours(0, 0, 0, 0); return d; });
    const counts = days.map(d => cs.reduce((s, x) => s + (x.history || []).filter(h => h[0] >= +d && h[0] < +d + DAY).length, 0));
    const max = Math.max(1, ...counts);
    const future = [...Array(14)].map((_, i) => cs.filter(x => x.seen && x.due >= Date.now() + (i - 1) * DAY && x.due < Date.now() + i * DAY).length);
    const fmax = Math.max(1, ...future);
    const hard = [...cs].filter(x => x.lapses).sort((a, b) => b.lapses - a.lapses).slice(0, 10);
    el.innerHTML = `<div class="stats">
      <div class="st-eggs"><div>🥚<b>${n.new}</b><small>mới</small></div><div>🐣<b>${n.learning}</b><small>đang học</small></div><div>🐥<b>${n.mature}</b><small>thuộc (≥21 ngày)</small></div><div>📐<b>${Store.list('grammar').filter(g => g.courseId === c.id).length}</b><small>ngữ pháp</small></div></div>
      <h3>Lượt ôn 28 ngày qua</h3><div class="bars">${counts.map((v, i) => `<i style="height:${v / max * 100}%" title="${days[i].toLocaleDateString('vi-VN')}: ${v}"></i>`).join('')}</div>
      <h3>Dự báo thẻ đến hạn 14 ngày tới</h3><div class="bars alt">${future.map((v, i) => `<i style="height:${v / fmax * 100}%" title="+${i} ngày: ${v}"></i>`).join('')}</div>
      <h3>Từ “khó nhằn” nhất</h3><div class="pc-tags">${hard.map(x => `<span class="tag">${esc(x.word)} · quên ${x.lapses}</span>`).join('') || '<span class="muted">Chưa có — giỏi quá!</span>'}</div>
      <div class="row"><button class="btn" id="stExp">⇩ Xuất CSV (Anki)</button></div></div>`;
    $('#stExp').onclick = () => download(c.name + '.csv', cs.map(x => [x.word, `${x.ipa || ''} ${x.pos || ''}<br>${x.meaning || ''}<br>${x.def || ''}<br>${(x.examples || []).map(e => e.s).join('<br>')}`].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n'), 'text/csv');
  },

  /* ---------- thêm nhanh từ chế độ đọc ---------- */
  quickAdd(word, sentence) {
    const courses = Store.list('courses');
    if (!courses.length) return toast('Hãy mở một lớp ngoại ngữ trước', 'err');
    const go = c => this.cardForm(c, this.scope[c.id] || {}, null, null, { word, sentence });
    if (courses.length === 1) return go(courses[0]);
    modal({ title: 'Thêm vào lớp nào?', body: `<div class="menu-list">${courses.map(c => `<button data-c="${c.id}">${c.flag} ${esc(c.name)}</button>`).join('')}</div>`, onOpen: (w, close) => $$('[data-c]', w).forEach(b => b.onclick = () => { close(); go(Store.find('courses', b.dataset.c)); }) });
  }
};
