/* =========================================================
   LỚP NGOẠI NGỮ 2 — Hành trình nhiệm vụ có cốt truyện,
   phiên học theo phương pháp khoa học, nghe chép video
   ========================================================= */

/* ---------- đếm tiến độ riêng cho từng lớp ---------- */
Object.assign(Lang, {
  st(cid) {
    const all = Store.get('lstats', {});
    return all[cid] = all[cid] || { total: {}, days: {}, j: { ch: 0, base: {}, gems: [], daily: {} } };
  },
  track(cid, k, n = 1) {
    if (!cid || !n) return;
    const s = this.st(cid), d = today();
    s.total[k] = (s.total[k] || 0) + n;
    s.days[d] = s.days[d] || {}; s.days[d][k] = (s.days[d][k] || 0) + n;
    Store.save('lstats');
  },
  todayStat(cid, k) { return (this.st(cid).days[today()] || {})[k] || 0; }
});

/* ---------- cốt truyện: Hành trình tìm 7 Viên Ngọc Chữ ---------- */
const STORY = [
  { name: 'Bến Cảng Chữ', c: 'mascot', color: '#ffb3dd', gem: '#ff6fae',
    intro: [['mascot', 'Thầy ơi! Gió lốc đêm qua cuốn mất 7 Viên Ngọc Chữ của Đại Từ Điển rồi. Không có chúng, chữ trên cả hành tinh sẽ phai dần!'], ['prof', 'Bình tĩnh nào. Mỗi viên ngọc rơi xuống một hòn đảo trên Ngữ Hải. Muốn ra khơi, trước tiên con phải đóng một con thuyền bằng từ vựng.']],
    quests: [{ k: 'cards', n: 10, t: 'Đóng thuyền: thêm 10 thẻ từ' }, { k: 'learned', n: 5, t: 'Học thuộc 5 từ mới' }, { k: 'reviews', n: 15, t: 'Ôn 15 lượt để thuyền chắc chắn' }],
    outro: [['prof', 'Con thuyền Thẻ Từ đã sẵn sàng. Viên Ngọc Khởi Đầu sáng lên rồi kìa!'], ['mascot', 'Giương buồm thôi! Hòn đảo đầu tiên vang vọng tiếng ai đó…']] },
  { name: 'Đảo Tiếng Vọng', c: 'note', color: '#c9b6ff', gem: '#8b5cf6',
    intro: [['note', 'La la~ Ở đảo này, ai nói gì cũng vọng lại ba lần. Viên ngọc chỉ hiện ra với người nghe rõ từng chữ.'], ['prof', 'Hãy nghe thật kỹ và chép lại. Tai luyện được thì miệng mới nói hay.']],
    quests: [{ k: 'dict', n: 10, t: 'Nghe chép đúng 10 câu' }, { k: 'reviews', n: 30, t: 'Ôn 30 lượt' }, { k: 'listen', n: 10, t: 'Nghe → nhớ nghĩa 10 thẻ' }],
    outro: [['note', 'Bạn nghe rõ thật đấy! Đây, Viên Ngọc Âm Vang của bạn.']] },
  { name: 'Rừng Ngữ Cảnh', c: 'booky', color: '#b8f0a0', gem: '#3aa35a',
    intro: [['booky', 'Suỵt… Trong rừng này, từ vựng trốn trong các câu văn như sóc trốn trên cây.'], ['prof', 'Một từ chỉ thật sự là của con khi con dùng được nó trong câu. Hãy tìm từ trong câu, rồi tự đặt câu của riêng mình.']],
    quests: [{ k: 'cloze', n: 15, t: 'Điền đúng 15 chỗ trống' }, { k: 'sentences', n: 3, t: 'Tự đặt 3 câu với từ mới' }, { k: 'mined', n: 5, t: 'Đào 5 từ từ bài đọc hoặc video' }],
    outro: [['booky', 'Cây nào cũng đã chịu nhả từ ra rồi. Viên Ngọc Ngữ Cảnh nằm ngay gốc cây kia!']] },
  { name: 'Núi Phát Âm', c: 'tomato', color: '#ffc0b0', gem: '#e8475f',
    intro: [['tomato', 'Muốn mở cổng núi phải hô đúng mật khẩu. Hô sai là cổng đóng chặt!'], ['prof', 'Bắt chước người bản ngữ: xem video, nghe từng đoạn, rồi nói lại.']],
    quests: [{ k: 'speakOk', n: 10, t: 'Nói đúng 10 từ (≥ 80%)' }, { k: 'video', n: 10, t: 'Nghe chép 10 đoạn video' }],
    outro: [['tomato', 'Cổng mở rồi! Giọng bạn vang khắp núi. Cầm lấy Viên Ngọc Âm Sắc nhé.']] },
  { name: 'Thư Viện Chìm', c: 'ghost', color: '#9fdcff', gem: '#2f6fd6',
    intro: [['ghost', 'Ú òa! Thư viện này chìm dưới biển cả trăm năm. Sách ở đây chỉ mở cho người hiểu cấu trúc câu.'], ['prof', 'Ngữ pháp là bộ khung. Có khung rồi, từ vựng mới đứng vững.']],
    quests: [{ k: 'grammar', n: 10, t: 'Làm đúng 10 câu ngữ pháp' }, { k: 'mined', n: 10, t: 'Đào thêm 10 từ từ bài đọc' }, { k: 'sentences', n: 5, t: 'Tự đặt thêm 5 câu' }],
    outro: [['ghost', 'Những cuốn sách đã mở mắt rồi. Viên Ngọc Cấu Trúc của bạn đây!']] },
  { name: 'Đảo Trò Chơi', c: 'star', color: '#ffe680', gem: '#d4a106',
    intro: [['star', 'Hòn đảo vui nhất Ngữ Hải! Ai thắng đủ trò sẽ được tặng viên ngọc lấp lánh nhất.'], ['prof', 'Chơi cũng là học, nhưng đừng quên ôn đều mỗi ngày nhé.']],
    quests: [{ k: 'games', n: 5, t: 'Thắng 5 ván trò chơi' }, { k: 'reviews', n: 100, t: 'Ôn 100 lượt' }, { k: 'streak', n: 5, t: 'Học liên tục 5 ngày', abs: true }],
    outro: [['star', 'Bạn chơi giỏi mà lại chăm nữa! Viên Ngọc Kiên Trì thuộc về bạn.']] },
  { name: 'Hải Đăng Thông Thái', c: 'prof', color: '#ffd9b0', gem: '#ff8a3d',
    intro: [['prof', 'Đây là ngọn hải đăng cuối cùng. Viên ngọc thứ bảy chỉ sáng khi trí nhớ của con đã thật sự bền vững.'], ['mascot', 'Con sẽ ôn thật đều, để từ nào cũng nhớ lâu ạ!']],
    quests: [{ k: 'mature', n: 30, t: 'Có 30 thẻ đã thuộc lâu (≥ 21 ngày)', abs: true }, { k: 'correct', n: 200, t: 'Trả lời đúng 200 lần' }, { k: 'video', n: 30, t: 'Nghe chép 30 đoạn video' }],
    outro: [['prof', 'Bảy viên ngọc đã về đủ. Đại Từ Điển sáng rực trở lại, và con đã thành một nhà du hành ngôn ngữ thực thụ.'], ['mascot', 'Nhưng biển chữ còn rộng lắm… Mình đi tiếp chứ thầy?']] }
];
const DAILY_POOL = [
  { id: 'due', t: 'Ôn hết thẻ đến hạn hôm nay', due: true },
  { id: 'new5', k: 'learned', n: 5, t: 'Học thuộc 5 từ mới' },
  { id: 'rev20', k: 'reviews', n: 20, t: 'Ôn 20 lượt' },
  { id: 'dict5', k: 'dict', n: 5, t: 'Nghe chép đúng 5 câu' },
  { id: 'sent2', k: 'sentences', n: 2, t: 'Tự đặt 2 câu với từ mới' },
  { id: 'mine3', k: 'mined', n: 3, t: 'Đào 3 từ từ bài đọc hoặc video' },
  { id: 'speak5', k: 'speakOk', n: 5, t: 'Nói đúng 5 từ (≥ 80%)' },
  { id: 'video5', k: 'video', n: 5, t: 'Chép 5 đoạn video' },
  { id: 'cloze8', k: 'cloze', n: 8, t: 'Điền đúng 8 chỗ trống' }
];

Object.assign(Lang, {
  /** giá trị tiến độ của một nhiệm vụ cốt truyện */
  questVal(c, q) {
    const s = this.st(c.id);
    if (q.k === 'mature') return this.cardsIn(c.id, {}).filter(x => (x.interval || 0) >= 21).length;
    if (q.k === 'streak') return Activity.streak();
    return (s.total[q.k] || 0) - (s.j.base[q.k] || 0);
  },
  dailyQuests(c) {
    const d = today(); const h = hashStr(d + c.id);
    const pool = [...DAILY_POOL]; const pick = [];
    for (let i = 0; i < 3; i++) pick.push(pool.splice((h >> (i * 3)) % pool.length, 1)[0]);
    return pick.map(q => {
      let v, n = q.n || 1;
      if (q.due) { const due = this.cardsIn(c.id, {}).filter(x => x.seen && (x.due || 0) <= Date.now()).length; v = due === 0 && this.todayStat(c.id, 'reviews') > 0 ? 1 : 0; n = 1; }
      else v = this.todayStat(c.id, q.k);
      return { ...q, v: Math.min(v, n), n, done: v >= n };
    });
  },

  /* ---------- 🗺 HÀNH TRÌNH ---------- */
  journey(el, c) {
    const s = this.st(c.id), J = s.j;
    if (!J.started) { J.started = Date.now(); J.base = { ...s.total }; Store.save('lstats'); }
    const ch = Math.min(J.ch, STORY.length - 1), done = J.ch >= STORY.length;
    const cur = STORY[ch];
    const qs = cur.quests.map(q => ({ ...q, v: Math.min(this.questVal(c, q), q.n) }));
    const allDone = qs.every(q => q.v >= q.n);
    const dq = this.dailyQuests(c);
    J.daily[today()] = J.daily[today()] || [];
    const bub = ([who, line], i) => `<div class="dlg ${i % 2 ? 'r' : ''}"><span class="dlg-av">${Art.creature(who, { size: 52, mood: 'joy' })}</span><p>${esc(line)}</p></div>`;
    const map = `<svg class="jmap" viewBox="0 0 900 260" xmlns="http://www.w3.org/2000/svg">
      <rect width="900" height="260" rx="28" fill="#bfe6ff"/>
      <path d="M40 210 Q90 230 140 205 T260 200 T380 210 T500 200 T620 210 T740 200 T860 210" fill="none" stroke="#fff" stroke-width="5" opacity=".6"/>
      <path d="${STORY.map((_, i) => `${i ? 'L' : 'M'}${80 + i * 123} ${i % 2 ? 150 : 100}`).join(' ')}" fill="none" stroke="#2a2346" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>
      ${STORY.map((st, i) => {
        const x = 80 + i * 123, y = i % 2 ? 150 : 100, got = J.gems.includes(i), here = i === ch && !done, locked = i > J.ch;
        return `<g class="isl ${locked ? 'locked' : ''} ${here ? 'here' : ''}">
          <path d="${blobPath(x, y + 14, 54, 30, i + 3)}" fill="${locked ? '#d9dde3' : st.color}" stroke="#2a2346" stroke-width="3"/>
          <g transform="translate(${x - 22} ${y - 34})">${locked ? `<text x="22" y="34" text-anchor="middle" font-size="30" font-family="Baloo 2" font-weight="800" fill="#8a8aa0">?</text>` : Art.creature(st.c, { size: 44, mood: got ? 'star' : 'joy' })}</g>
          ${got ? `<circle cx="${x + 34}" cy="${y - 18}" r="11" fill="${st.gem}" stroke="#2a2346" stroke-width="2.5"/>` : ''}
          <text x="${x}" y="${y + 66}" text-anchor="middle" class="isl-n">${locked ? 'Chưa khám phá' : st.name}</text>
          ${here ? `<g transform="translate(${x + 36} ${y - 44})" class="boat"><path d="M2 26 h36 l-6 10 h-24z" fill="#ff8a3d" stroke="#2a2346" stroke-width="2.5"/><path d="M20 26 V2 L36 22z" fill="#fff" stroke="#2a2346" stroke-width="2.5"/></g>` : ''}
        </g>`;
      }).join('')}
    </svg>`;
    el.innerHTML = `
      <div class="jr-head">
        <div><h2>🗺 Hành trình tìm 7 Viên Ngọc Chữ</h2><p class="muted">Mỗi hòn đảo là một chương truyện. Làm xong nhiệm vụ để nhận ngọc và mở đảo tiếp theo.</p></div>
        <div class="gems">${STORY.map((st, i) => `<span class="gem ${J.gems.includes(i) ? 'got' : ''}" style="--g:${st.gem}" title="${st.name}"></span>`).join('')}</div>
      </div>
      ${map}
      <div class="jr-cols">
        <section class="jr-ch">
          ${done ? `<h3>🏆 Đã hoàn thành cả 7 chương!</h3>${STORY[6].outro.map(bub).join('')}<p class="muted">Bạn có thể bắt đầu lại hành trình với mục tiêu mới.</p><button class="btn" id="jrReset">↺ Hành trình mới</button>` : `
          <div class="ch-tag" style="--cc:${cur.color}">Chương ${ch + 1} · ${cur.name}</div>
          ${cur.intro.map(bub).join('')}
          <div class="quests">${qs.map(q => `<div class="quest ${q.v >= q.n ? 'ok' : ''}"><span class="q-ic">${q.v >= q.n ? '✔' : '◇'}</span><div class="grow"><b>${q.t}</b><div class="q-bar"><i style="width:${q.v / q.n * 100}%"></i></div></div><span class="q-n">${q.v}/${q.n}</span></div>`).join('')}</div>
          ${allDone ? `<div class="ch-done">${cur.outro.map(bub).join('')}<button class="btn pri big" id="jrClaim">💎 Nhận ngọc & sang đảo tiếp</button></div>` : `<p class="muted sm">Gợi ý: ${this.questHint(qs.find(q => q.v < q.n), c)}</p>`}`}
        </section>
        <section class="jr-daily">
          <h3>☀️ Nhiệm vụ hôm nay</h3>
          ${dq.map(q => `<div class="quest ${q.done ? 'ok' : ''}"><span class="q-ic">${q.done ? '✔' : '○'}</span><div class="grow"><b>${q.t}</b><div class="q-bar"><i style="width:${q.v / q.n * 100}%"></i></div></div><span class="q-n">${q.v}/${q.n}</span></div>`).join('')}
          ${dq.every(q => q.done) ? (J.daily[today()].includes('all') ? '<p class="ok">Đã nhận thưởng hôm nay ✓</p>' : '<button class="btn pri" id="jrDaily">🎁 Nhận thưởng ngày</button>') : '<p class="muted sm">Làm đủ 3 nhiệm vụ để Chữ-tchi được ăn no và lớn thêm.</p>'}
          <div class="jr-go"><a class="btn hot" href="#/ngoai-ngu/${c.id}/hoc">🧠 Vào học ngay</a><a class="btn" href="#/ngoai-ngu/${c.id}/video">🎬 Nghe chép video</a></div>
          <details class="science"><summary>Vì sao học theo cách này?</summary>
            <ul><li><b>Lặp lại ngắt quãng:</b> ôn đúng lúc sắp quên giúp nhớ lâu hơn nhiều so với học dồn.</li>
            <li><b>Gợi nhớ chủ động:</b> tự nhớ ra đáp án (gõ, điền, nói) hiệu quả hơn đọc lại.</li>
            <li><b>Xen kẽ dạng bài:</b> trộn lật thẻ, gõ, điền chỗ trống, nghe để não không “học vẹt”.</li>
            <li><b>Tự đặt câu:</b> tự tạo ra câu có từ mới giúp hiểu sâu và nhớ bền.</li>
            <li><b>Ngữ cảnh thật:</b> đào từ từ bài báo, video bạn thích, kèm câu gốc.</li>
            <li><b>Hình + chữ:</b> gắn emoji hoặc ảnh cho từ, cộng thêm mẹo nhớ cho từ hay quên.</li></ul></details>
        </section>
      </div>`;
    $('#jrClaim') && ($('#jrClaim').onclick = () => {
      J.gems.push(ch); J.ch = ch + 1; J.base = { ...s.total }; Store.save('lstats');
      Pet.gain('book', 2); Sfx.jingle([523, 659, 784, 1047, 1319]);
      toast(`💎 Nhận được ngọc của ${cur.name}!`); this.journey(el, c);
    });
    $('#jrDaily') && ($('#jrDaily').onclick = () => { J.daily[today()].push('all'); Store.save('lstats'); Pet.gain('review', 15); Sfx.jingle(); toast('🎁 Chữ-tchi ăn no rồi, cảm ơn bạn!'); this.journey(el, c); });
    $('#jrReset') && ($('#jrReset').onclick = async () => { if (await confirmBox('Bắt đầu lại hành trình (giữ nguyên thẻ và tiến độ học)?')) { J.ch = 0; J.gems = []; J.base = { ...s.total }; Store.save('lstats'); this.journey(el, c); } });
  },
  questHint(q, c) {
    if (!q) return '';
    const go = (tab, label) => `<a href="#/ngoai-ngu/${c.id}/${tab}">${label}</a>`;
    return ({ cards: go('tu-vung', 'thêm thẻ ở tab Thẻ từ (có nút 📖 tra từ điển miễn phí)'), learned: go('hoc', 'vào Học & ôn để học từ mới'), reviews: go('hoc', 'vào Học & ôn'), dict: go('nghe-chep', 'tab Nghe chép'), listen: go('hoc', 'Học & ôn, chọn chế độ Nghe'), cloze: go('hoc', 'Học & ôn, chọn Điền chỗ trống'), sentences: go('hoc', 'khi học từ mới, viết một câu của riêng bạn'), mined: 'bôi đen một từ khi đọc bài trong Lưu trữ rồi bấm 🃏, hoặc bấm vào chữ sau khi chép video', speakOk: go('hoc', 'Học & ôn, chọn Luyện nói'), video: go('video', 'tab Video'), grammar: go('ngu-phap', 'luyện ở tab Ngữ pháp'), games: go('tro-choi', 'tab Trò chơi'), streak: 'học mỗi ngày một chút', mature: go('hoc', 'ôn đều mỗi ngày'), correct: go('hoc', 'Học & ôn') })[q.k] || '';
  },

  /* ---------- 🧠 PHIÊN HỌC THÔNG MINH ---------- */
  study(el, c, sc) {
    const S = Store.settings(); S.newPerDay = S.newPerDay || 10; S.studyMode = S.studyMode || 'mix';
    const all = this.cardsIn(c.id, sc);
    const due = all.filter(x => x.seen && (x.due || 0) <= Date.now()).sort((a, b) => (a.due || 0) - (b.due || 0));
    const learnedToday = this.todayStat(c.id, 'learned');
    const today = new Date().toDateString();
    if (!S.extraNew || S.extraNew.d !== today) S.extraNew = { d: today, n: 0 };
    const unseen = all.filter(x => !x.seen);
    const fresh = unseen.slice(0, Math.max(0, S.newPerDay + S.extraNew.n - learnedToday));
    // “học thêm”: nâng hạn mức riêng hôm nay để có thêm k từ mới
    const more = k => { S.extraNew = { d: today, n: Math.max(0, learnedToday + fresh.length + k - S.newPerDay) }; Store.save('settings'); this.study(el, c, sc); };
    const MODES = [['mix', '🔀 Tự trộn (khuyên dùng)'], ['flip', '🃏 Lật thẻ'], ['type', '⌨ Gõ đáp án'], ['cloze', '✍️ Điền chỗ trống'], ['translate', '🔁 Dịch câu'], ['build', '🧩 Xếp câu'], ...(isJa(c) ? [['particle', '🔣 Điền trợ từ']] : []), ['listen', '🎧 Nghe → nghĩa'], ['speak', '🎙 Luyện nói']];
    el.innerHTML = `<div class="st-start">
      <div class="st-big"><div><b>${due.length}</b><span>thẻ đến hạn</span></div><div><b>${fresh.length}</b><span>từ mới hôm nay</span></div><div><b>${Math.max(1, Math.round((due.length * 8 + fresh.length * 30) / 60))}′</b><span>ước tính</span></div></div>
      <label class="lbl">Cách luyện</label><div class="seg wrap" id="stMode">${MODES.map(m => `<button data-m="${m[0]}" class="${S.studyMode === m[0] ? 'on' : ''}">${m[1]}</button>`).join('')}</div>
      <label class="rlbl">Từ mới mỗi ngày <input type="number" class="inp sm" id="stNew" value="${S.newPerDay}" min="0" max="500" style="width:80px"></label>
      <div class="row st-more"><span class="muted sm">Hôm nay đã học ${learnedToday} từ mới · còn ${unseen.length} từ chưa học.</span>${unseen.length > fresh.length ? `<button class="btn sm" data-more="10">＋ Học thêm 10 từ</button><button class="btn sm" data-more="20">＋ 20</button><button class="btn sm" data-more="50">＋ 50</button>` : ''}</div>
      <p class="muted sm">Từ mới sẽ được <b>giới thiệu</b> trước (nghe, xem ví dụ, tự đặt câu), rồi <b>kiểm tra lại sau vài thẻ</b>. Thẻ ôn được trộn nhiều dạng bài khác nhau.</p>
      <button class="btn pri big" id="stGo" ${due.length + fresh.length ? '' : 'disabled'}>▶ Bắt đầu phiên học</button>
      ${due.length + fresh.length ? '' : `<p class="ok">Hôm nay không còn gì để học ở phạm vi này 🎉 Thử <a href="#/ngoai-ngu/${c.id}/video">nghe chép video</a> hoặc <a href="#/luu-tru">đọc một bài báo</a> để đào thêm từ.</p>`}
    </div>`;
    $$('#stMode button').forEach(b => b.onclick = () => { S.studyMode = b.dataset.m; Store.save('settings'); $$('#stMode button').forEach(x => x.classList.toggle('on', x === b)); });
    $('#stNew').onchange = e => { S.newPerDay = +e.target.value; Store.save('settings'); this.study(el, c, sc); };
    $$('[data-more]', el).forEach(b => b.onclick = () => more(+b.dataset.more));
    $('#stGo').onclick = () => this.runSession(el, c, due, fresh, sc);
  },

  runSession(el, c, due, fresh, sc) {
    const S = Store.settings();
    // xếp hàng: cứ 3 thẻ ôn thì chen một từ mới (giới thiệu)
    const q = []; const d = [...due], f = [...fresh];
    while (d.length || f.length) { for (let i = 0; i < 3 && d.length; i++) q.push({ x: d.shift(), ph: 'review' }); if (f.length) q.push({ x: f.shift(), ph: 'intro' }); }
    const total = q.length; let n = 0, right = 0, wrong = [], learned = 0;
    el.innerHTML = `<div class="ss"><div class="ss-top"><div class="ss-bar"><i id="ssBar"></i></div><span id="ssCnt"></span><button class="btn sm" id="ssEnd">Kết thúc</button></div><div id="ssStage" class="ss-stage"></div></div>`;
    const stage = $('#ssStage');
    const later = (item, k) => q.splice(Math.min(q.length, k), 0, item);
    const pickMode = x => {
      const ex = exOf(x);
      if (S.studyMode !== 'mix') {
        if (S.studyMode === 'cloze' && !clozeOf(x)) return 'type';
        if (['translate', 'build', 'particle'].includes(S.studyMode) && !ex) return 'type';
        return S.studyMode;
      }
      const opts = ['flip', 'type', 'listen']; if (clozeOf(x)) opts.push('cloze', 'cloze');
      if (ex && (x.reps || 0) >= 1) { opts.push('translate', 'build'); if (isJa(c) && (x.examples || []).some(e => e.s && particleOf(e))) opts.push('particle'); }
      if ((x.reps || 0) < 2) return Math.random() < .5 ? 'flip' : 'choose';
      return opts[Math.floor(Math.random() * opts.length)];
    };
    const progress = () => { $('#ssBar').style.width = (n / Math.max(1, n + q.length) * 100) + '%'; $('#ssCnt').textContent = `${n} xong · còn ${q.length}`; };
    const gradeBtns = x => `<div class="rv-grade">${[[0, 'Quên', 'again'], [3, 'Khó', 'hard'], [4, 'Được', 'good'], [5, 'Dễ', 'easy']].map(([g, l, k]) => `<button class="g-${k}" data-q="${g}"><b>${l}</b><small>${SRS.preview(x, g).label}</small></button>`).join('')}</div>`;
    const finish = () => {
      document.removeEventListener('keydown', key);
      const acc = n ? Math.round(right / n * 100) : 0;
      stage.innerHTML = `<div class="ss-end">${Art.creature(Pet.form(), { size: 120, mood: 'star' })}<h2>Xong phiên học!</h2>
        <div class="st-big"><div><b>${n}</b><span>lượt</span></div><div><b>${acc}%</b><span>đúng</span></div><div><b>${learned}</b><span>từ mới đã thuộc</span></div></div>
        ${wrong.length ? `<p>Những từ cần chú ý:</p><div class="pc-tags">${[...new Set(wrong)].map(x => `<span class="tag">${esc(x.word)} · ${esc(x.meaning || '')}</span>`).join('')}</div>` : '<p class="ok">Không sai từ nào, giỏi quá!</p>'}
        <div class="row center">${(() => { const left = this.cardsIn(c.id, sc || {}).filter(y => !y.seen).length; return left ? `<button class="btn pri" id="ssMore">＋ Học thêm 10 từ mới</button><button class="btn" id="ssMore20">＋ 20 từ</button>` : ''; })()}
        <a class="btn" href="#/ngoai-ngu/${c.id}/hanh-trinh">🗺 Xem hành trình</a></div></div>`;
      const goMore = k => { const fr = this.cardsIn(c.id, sc || {}).filter(y => !y.seen).slice(0, k); const S2 = Store.settings(); const today = new Date().toDateString(); S2.extraNew = { d: today, n: Math.max(S2.extraNew && S2.extraNew.d === today ? S2.extraNew.n : 0, this.todayStat(c.id, 'learned') + k - S2.newPerDay) }; Store.save('settings'); this.runSession(el, c, [], fr, sc); };
      $('#ssMore') && ($('#ssMore').onclick = () => goMore(10)); $('#ssMore20') && ($('#ssMore20').onclick = () => goMore(20));
      $('#ssBar').style.width = '100%'; Sfx.jingle();
    };
    $('#ssEnd').onclick = finish;
    let onKeyAct = null;
    const key = e => {
      if (!document.body.contains(stage)) return document.removeEventListener('keydown', key);
      if (e.target.closest('input,textarea')) return;
      onKeyAct && onKeyAct(e);
    };
    document.addEventListener('keydown', key);

    const next = () => {
      onKeyAct = null; progress();
      if (!q.length) return finish();
      const it = q.shift(), x = it.x;
      if (it.ph === 'intro') return intro(it);
      if (it.ph === 'test') return test(it);
      return review(it, pickMode(x));
    };
    /* 1. giới thiệu từ mới: xem đủ thông tin, nghe, tự đặt câu */
    const intro = it => {
      const x = it.x;
      stage.innerHTML = `<div class="intro">
        <div class="in-l"><div class="in-emo">${x.img ? `<img src="${esc(x.img)}" alt="">` : esc(x.emoji || '🥚')}</div><span class="badge-new">Từ mới</span></div>
        <div class="in-r">
          <div class="fc-word">${rubyWord(x, c)} <button class="btn sm" id="inSay">🔊</button></div>
          <div class="muted">${esc(x.ipa || '')} ${x.pos ? '· ' + esc(x.pos) : ''}</div>
          <div class="fb-mean">${esc(x.meaning || '')}</div>${x.def ? `<div class="fb-def">${esc(x.def)}</div>` : ''}
          ${x.usage ? `<div class="fb-use">⚠️ ${esc(x.usage)}</div>` : ''}
          ${(x.examples || []).length ? `<ul class="fb-ex">${x.examples.slice(0, 3).map(e => `<li>${esc(e.s)}${e.t ? `<small>${esc(e.t)}</small>` : ''}</li>`).join('')}</ul>` : ''}
          ${x.note ? `<div class="fb-note">💡 ${esc(x.note)}</div>` : ''}
          <label class="lbl">✍️ Đặt một câu của riêng bạn với từ này <small class="muted">(không bắt buộc, nhưng giúp nhớ lâu hơn hẳn)</small></label>
          <textarea class="inp" id="inMine" rows="2" placeholder="Câu của tôi…"></textarea>
          <div class="row"><button class="btn pri big" id="inOk">Đã hiểu, kiểm tra sau ›</button><span class="muted sm">Enter để tiếp</span></div>
        </div></div>`;
      const say = () => Speech.speak(x.word, c.lang, .9); say(); $('#inSay').onclick = say;
      const ok = () => {
        const m = $('#inMine').value.trim();
        if (m) { x.mine = [...(x.mine || []), m]; x.examples = [...(x.examples || []), { s: m, t: '(câu của tôi)' }]; Store.save('cards'); this.track(c.id, 'sentences'); Activity.add('note'); }
        later({ x, ph: 'test', tries: (it.tries || 0) }, 3); next();
      };
      $('#inOk').onclick = ok;
      $('#inMine').onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ok(); } };
      onKeyAct = e => { if (e.key === 'Enter') ok(); };
    };
    /* 2. kiểm tra từ vừa học: chọn đáp án hoặc gõ */
    const test = it => {
      const x = it.x; const pool = this.cardsIn(c.id, {}).filter(y => y.id !== x.id && (y.meaning || y.def));
      if (pool.length >= 3) {
        const opts = shuffle([x, ...shuffle(pool).slice(0, 3)]);
        stage.innerHTML = `<div class="rv-q"><span class="badge-new">Kiểm tra từ vừa học</span><div class="fc-word sm">${esc(x.meaning || x.def)}</div><div class="quiz-opts">${opts.map(o => `<button data-id="${o.id}">${rubyWord(o, c)}</button>`).join('')}</div><div id="rvRes"></div></div>`;
        $$('.quiz-opts button', stage).forEach((b, i) => b.onclick = () => pick(b));
        onKeyAct = e => { const k = +e.key; if (k >= 1 && k <= 4) pick($$('.quiz-opts button', stage)[k - 1]); };
        const pick = b => {
          if (!b || stage.dataset.locked) return; stage.dataset.locked = 1;
          const ok = b.dataset.id === x.id; b.classList.add(ok ? 'ok' : 'bad'); $(`.quiz-opts [data-id="${x.id}"]`, stage).classList.add('ok');
          Speech.speak(x.word, c.lang); setTimeout(() => { delete stage.dataset.locked; result(ok); }, ok ? 600 : 1400);
        };
      } else {
        stage.innerHTML = `<div class="rv-q"><span class="badge-new">Kiểm tra từ vừa học</span><div class="fc-word sm">${esc(x.meaning || x.def)}</div><input class="inp big-word" id="tIn" autocomplete="off" placeholder="Gõ từ (hoặc cách đọc)…"><button class="btn pri" id="tOk">Kiểm tra ↵</button></div>`;
        const inp = $('#tIn'); inp.focus();
        const chk = () => { const j = judgeCard(inp.value, x); const ok = j.ok || j.near; toast(j.ok ? 'Chính xác!' : j.near ? `Gần đúng (${j.pct}%) · chuẩn là: ${x.word}` : 'Đáp án: ' + x.word, ok ? 'ok' : 'err'); result(ok); };
        $('#tOk').onclick = chk; inp.onkeydown = e => { if (e.key === 'Enter') { e.stopPropagation(); chk(); } };
      }
      const result = ok => {
        n++;
        if (ok) { right++; SRS.grade(x, 4); learned++; this.track(c.id, 'learned'); this.track(c.id, 'reviews'); this.track(c.id, 'correct'); Sfx.beep(988); }
        else { wrong.push(x); this.track(c.id, 'reviews'); later({ x, ph: 'intro', tries: (it.tries || 0) + 1 }, 2); Sfx.beep(260, .15); }
        next();
      };
    };
    /* 3. ôn thẻ cũ bằng nhiều dạng bài */
    const review = (it, mode) => {
      const x = it.x; const btns = gradeBtns(x);
      const show = sug => { $('.rv-btns', stage).hidden = false; if (sug) $('.g-' + sug, stage)?.classList.add('suggest'); onKeyAct = e => { if (['1', '2', '3', '4'].includes(e.key)) grade([0, 3, 4, 5][+e.key - 1]); }; };
      const tag = { flip: '🃏 Lật thẻ', type: '⌨ Gõ đáp án', cloze: '✍️ Điền chỗ trống', listen: '🎧 Nghe', speak: '🎙 Nói', choose: '🔘 Chọn đáp án', translate: '🔁 Dịch câu', build: '🧩 Xếp câu', particle: '🔣 Điền trợ từ' }[mode];
      const head = `<span class="mode-tag">${tag}</span>`;
      if (mode === 'flip') {
        stage.innerHTML = head + this.cardFace(x, c) + `<div class="rv-show"><button class="btn big pri" id="rvShow">Hiện đáp án (Space)</button></div><div class="rv-btns" hidden>${btns}</div>`;
        const reveal = () => { $('.flip', stage).classList.add('flipped'); $('.rv-show', stage).hidden = true; Speech.speak(x.word, c.lang); show(); };
        $('#rvShow').onclick = reveal; $('.flip', stage).onclick = reveal;
        onKeyAct = e => { if (e.key === ' ') { e.preventDefault(); reveal(); } };
      } else if (mode === 'choose') {
        const pool = this.cardsIn(c.id, {}).filter(y => y.id !== x.id);
        if (pool.length < 3) return review(it, 'flip');
        const opts = shuffle([x, ...shuffle(pool).slice(0, 3)]);
        stage.innerHTML = head + `<div class="rv-q"><div class="fc-word">${rubyWord(x, c)}</div><div class="quiz-opts">${opts.map(o => `<button data-id="${o.id}">${esc(o.meaning || o.def)}</button>`).join('')}</div></div><div class="rv-btns" hidden>${btns}</div>`;
        Speech.speak(x.word, c.lang);
        $$('.quiz-opts button', stage).forEach(b => b.onclick = () => { const ok = b.dataset.id === x.id; b.classList.add(ok ? 'ok' : 'bad'); $(`.quiz-opts [data-id="${x.id}"]`, stage).classList.add('ok'); $$('.quiz-opts button', stage).forEach(y => y.disabled = true); show(ok ? 'good' : 'again'); });
      } else if (mode === 'type' || mode === 'cloze') {
        const cz = mode === 'cloze' ? clozeOf(x) : null;
        stage.innerHTML = head + `<div class="rv-q">${cz ? `<div class="cz-sent">${esc(cz.before)}<input class="cz-in" id="rvIn" autocomplete="off" size="${Math.max(4, cz.hidden.length + 2)}" placeholder="?">${esc(cz.after)}</div>${cz.t && cz.t !== '(câu của tôi)' ? `<div class="muted">${esc(cz.t)}</div>` : ''}` : `<div class="fc-word sm">${esc(x.meaning || x.def)}</div><input class="inp big-word" id="rvIn" autocomplete="off" placeholder="Gõ từ (hoặc cách đọc)…">`}
          <div class="fc-pos">${cz ? 'gợi ý: ' + esc(x.meaning || '') : esc(x.pos || '')}</div><button class="btn pri" id="rvCheck">Kiểm tra ↵</button><div id="rvRes"></div></div><div class="rv-btns" hidden>${btns}</div>`;
        const inp = $('#rvIn'); inp.focus();
        const chk = () => {
          if (inp.readOnly) return;
          const j = judgeAns(inp.value, [...(cz ? [cz.hidden] : []), ...cardForms(x)]);
          const ok = j.ok, near = j.near;
          inp.readOnly = true; inp.classList.add(ok ? 'ok' : near ? 'near' : 'bad');
          const typed = inp.value; if (cz) inp.value = cz.hidden;
          $('#rvRes').innerHTML = (ok ? '<b class="ok">✓ Chính xác!</b> ' : near ? `<b class="near">≈ Gần đúng (${j.pct}%)</b> bạn gõ <s>${esc(typed)}</s> → ` : '<b class="bad">✗ Đáp án:</b> ') + `<b>${rubyWord(x, c)}</b> ${esc(x.ipa || '')} · ${esc(x.meaning || '')}`;
          Speech.speak(cz ? cz.before + cz.hidden + cz.after : x.word, c.lang, .95);
          if (cz && (ok || near)) this.track(c.id, 'cloze');
          show(ok ? 'good' : near ? 'hard' : 'again');
        };
        $('#rvCheck').onclick = chk; inp.onkeydown = e => { if (e.key === 'Enter') { e.stopPropagation(); e.preventDefault(); inp.readOnly ? null : chk(); } };
      } else if (mode === 'translate') {
        const e = exOf(x); if (!e) return review(it, 'type');
        const toTarget = Math.random() < .65;   // phần lớn: Việt → ngoại ngữ (khó hơn, nhớ lâu hơn)
        const src = toTarget ? e.t : e.s, ans = toTarget ? e.s : e.t;
        stage.innerHTML = head + `<div class="rv-q tr-q">
          <div class="muted sm">${toTarget ? `Dịch sang ${esc(c.name)}` : 'Dịch sang tiếng Việt'} · từ khoá: <b>${rubyWord(x, c)}</b> (${esc(x.meaning || '')})</div>
          <div class="tr-src">${esc(src)} ${toTarget ? '' : '<button class="btn sm" id="trSay">🔊</button>'}</div>
          <textarea class="inp" id="trIn" rows="2" placeholder="Bản dịch của bạn… (Enter để kiểm tra)"></textarea>
          <div class="row"><button class="btn pri" id="trOk">Kiểm tra ↵</button><button class="btn" id="trShow">Xem đáp án</button></div><div id="rvRes"></div></div><div class="rv-btns" hidden>${btns}</div>`;
        $('#trSay') && ($('#trSay').onclick = () => Speech.speak(e.s, c.lang, .9));
        if (!toTarget) Speech.speak(e.s, c.lang, .9);
        const inp = $('#trIn'); inp.focus();
        const chk = () => {
          if (inp.readOnly) return; inp.readOnly = true;
          const typed = inp.value.trim(); const j = judgeAns(typed, [ans]);
          const sug = !typed ? 'again' : j.pct >= 90 ? 'good' : j.pct >= 65 ? 'hard' : 'again';
          const diff = toTarget && (isJa(c) || !/\s/.test(ans)) ? charDiff(typed, ans) : esc(ans);
          $('#rvRes').innerHTML = `<div class="d-res"><div class="d-score ${j.pct >= 85 ? 'good' : ''}">${typed ? j.pct : 0}%</div><div>
            <div class="muted sm">Câu mẫu:</div><div class="d-ans">${diff}</div>${typed ? `<div class="muted">Bạn viết: ${esc(typed)}</div>` : ''}
            <div class="muted sm">${toTarget ? 'Dịch có nhiều cách đúng — % chỉ so với câu mẫu. Nếu câu bạn vẫn đúng ý, cứ chấm “Được”.' : 'So sánh ý với câu mẫu rồi tự chấm.'}</div>
            ${typed && window.AI ? '<button class="btn sm" id="trAI">✦ Nhờ AI chấm & sửa</button><div id="trAIres"></div>' : ''}</div></div>`;
          Speech.speak(e.s, c.lang, .9);
          $('#trAI') && ($('#trAI').onclick = async ev => {
            ev.target.disabled = true; ev.target.textContent = '✦ Đang chấm…';
            try {
              const o = await AI.json({ prompt: `Học viên dịch ${toTarget ? `câu tiếng Việt sang ${c.name}` : `câu ${c.name} sang tiếng Việt`}.\nCâu gốc: "${src}"\nCâu mẫu: "${ans}"\nBản dịch học viên: "${typed}"\nChấm như giáo viên tận tâm. Trả về JSON {"score":0-100,"ok":true/false (đúng ý và đúng ngữ pháp),"fixed":"bản dịch của học viên đã sửa tối thiểu","notes":["giải thích ngắn bằng tiếng Việt từng lỗi: ngữ pháp, trợ từ, từ vựng, sắc thái"]}`, maxTokens: 800 });
              $('#trAIres').innerHTML = `<div class="ai-fb"><b>${o.ok ? '✓' : '✗'} ${o.score}/100</b>${o.fixed ? `<div>Sửa: <b>${esc(o.fixed)}</b></div>` : ''}<ul>${(o.notes || []).map(n => `<li>${esc(n)}</li>`).join('')}</ul></div>`;
              $$('.rv-grade .suggest', stage).forEach(b => b.classList.remove('suggest')); $('.g-' + (o.score >= 85 ? 'good' : o.score >= 60 ? 'hard' : 'again'), stage)?.classList.add('suggest');
            } catch (er) { $('#trAIres').innerHTML = `<p class="bad">AI chưa chấm được: ${esc(er.message || er)}</p>`; }
            ev.target.remove();
          });
          show(sug);
        };
        $('#trOk').onclick = chk; $('#trShow').onclick = () => { inp.value = inp.value || ''; chk(); };
        inp.onkeydown = ev => { if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); ev.stopPropagation(); chk(); } };
      } else if (mode === 'build') {
        const e = exOf(x); const parts = e ? chunksOf(e.s, c.lang) : [];
        if (parts.length < 3) return review(it, e ? 'translate' : 'type');
        const sep = /\s/.test(e.s.trim()) ? ' ' : '';
        delete stage.dataset.done;
        let bank = shuffle(parts.map((t, i) => ({ t, i }))); if (bank.every((b, k) => b.i === k)) bank.reverse();
        const placed = [];
        stage.innerHTML = head + `<div class="rv-q bd-q"><div class="muted sm">Xếp các mảnh thành câu đúng · nghĩa:</div><div class="tr-src">${esc(e.t)}</div>
          <div class="bd-line" id="bdLine"></div><div class="bd-bank" id="bdBank"></div>
          <div class="row"><button class="btn" id="bdReset">↺ Làm lại</button><button class="btn pri" id="bdOk" disabled>Kiểm tra</button></div><div id="rvRes"></div></div><div class="rv-btns" hidden>${btns}</div>`;
        const draw = () => {
          $('#bdLine').innerHTML = placed.map((b, k) => `<button class="chip on" data-k="${k}">${esc(b.t)}</button>`).join('') || '<span class="muted sm">Bấm các mảnh bên dưới theo thứ tự…</span>';
          $('#bdBank').innerHTML = bank.map((b, k) => `<button class="chip" data-k="${k}">${esc(b.t)}</button>`).join('');
          $('#bdOk').disabled = bank.length > 0;
          $$('#bdBank .chip').forEach(b => b.onclick = () => { if (stage.dataset.done) return; placed.push(...bank.splice(+b.dataset.k, 1)); draw(); });
          $$('#bdLine .chip').forEach(b => b.onclick = () => { if (stage.dataset.done) return; bank.push(...placed.splice(+b.dataset.k, 1)); draw(); });
        };
        draw();
        $('#bdReset').onclick = () => { if (stage.dataset.done) return; bank.push(...placed.splice(0)); draw(); };
        $('#bdOk').onclick = () => {
          stage.dataset.done = 1;
          const mine = placed.map(b => b.t).join(sep); const ok = normAns(mine) === normAns(e.s);
          $$('#bdLine .chip').forEach((b, k) => b.classList.add(normAns(placed[k].t) === normAns(parts[k]) ? 'ok' : 'bad'));
          $('#rvRes').innerHTML = ok ? '<b class="ok">✓ Chuẩn rồi!</b>' : `<b class="bad">✗ Câu đúng:</b> <span class="d-ans">${esc(e.s)}</span>`;
          Speech.speak(e.s, c.lang, .9); show(ok ? 'good' : 'again');
        };
      } else if (mode === 'particle') {
        const pool = (x.examples || []).filter(e => e.s && e.t && e.t !== '(câu của tôi)').map(particleOf).filter(Boolean);
        if (!pool.length) return review(it, 'translate');
        const p = pool[Math.floor(Math.random() * pool.length)];
        const opts = shuffle([p.pt, ...shuffle(PARTICLES.filter(q => q !== p.pt)).slice(0, 3)]);
        stage.innerHTML = head + `<div class="rv-q"><div class="cz-sent">${esc(p.before)}<span class="pt-gap">？</span>${esc(p.after)}</div><div class="muted">${esc(p.t)}</div>
          <div class="quiz-opts pt-opts">${opts.map(o => `<button data-p="${o}">${o}</button>`).join('')}</div><div id="rvRes"></div></div><div class="rv-btns" hidden>${btns}</div>`;
        const pick = b => {
          if (!b || stage.dataset.locked) return; stage.dataset.locked = 1;
          const ok = b.dataset.p === p.pt; b.classList.add(ok ? 'ok' : 'bad'); $(`.pt-opts [data-p="${p.pt}"]`, stage).classList.add('ok');
          $('.pt-gap', stage).textContent = p.pt; $('.pt-gap', stage).classList.add(ok ? 'ok' : 'bad');
          $$('.pt-opts button', stage).forEach(y => y.disabled = true); delete stage.dataset.locked;
          Speech.speak(p.s, c.lang, .9); show(ok ? 'good' : 'again');
        };
        $$('.pt-opts button', stage).forEach(b => b.onclick = () => pick(b));
        onKeyAct = ev => { const k = +ev.key; if (k >= 1 && k <= 4 && $('.rv-btns', stage).hidden) pick($$('.pt-opts button', stage)[k - 1]); };
      } else if (mode === 'listen') {
        stage.innerHTML = head + `<div class="rv-q"><button class="btn big" id="rvPlay">🔊 Nghe lại</button><p class="muted">Nghe và tự nhớ nghĩa trong đầu, rồi bấm hiện đáp án.</p><button class="btn pri" id="rvShow">Hiện đáp án (Space)</button><div id="rvRes"></div></div><div class="rv-btns" hidden>${btns}</div>`;
        const play = () => Speech.speak(x.word, c.lang); play(); $('#rvPlay').onclick = play;
        const reveal = () => { if (!$('.rv-btns', stage).hidden) return; $('#rvRes').innerHTML = this.cardFace(x, c); $('#rvRes .flip').classList.add('flipped'); this.track(c.id, 'listen'); show(); };
        $('#rvShow').onclick = reveal; onKeyAct = e => { if (e.key === ' ') { e.preventDefault(); reveal(); } };
      } else {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) return review(it, 'flip');
        stage.innerHTML = head + `<div class="rv-q"><div class="fc-word">${rubyWord(x, c)}</div><div class="muted">${esc(x.meaning || '')}</div><div class="row center"><button class="btn" id="rvPlay">🔊 Nghe mẫu</button><button class="btn pri big" id="rvMic">🎙 Bấm rồi nói</button><button class="btn" id="rvSkip">Bỏ qua</button></div><div id="rvRes"></div></div><div class="rv-btns" hidden>${btns}</div>`;
        $('#rvPlay').onclick = () => Speech.speak(x.word, c.lang, .85);
        $('#rvSkip').onclick = () => show();
        $('#rvMic').onclick = () => {
          const r = new SR(); r.lang = c.lang; r.maxAlternatives = 5; $('#rvMic').disabled = true; $('#rvMic').textContent = '👂 Đang nghe…';
          r.onresult = ev => {
            const alts = [...ev.results[0]].map(a => a.transcript);
            const best = Math.max(...alts.map(a => Math.max(similarity(a, x.word), ...(x.ipa || '').split(/[\/／,、]/).map(rd => similarity(a, rd)))));
            if (best >= 80) this.track(c.id, 'speakOk');
            $('#rvRes').innerHTML = `<div class="d-res"><div class="d-score ${best >= 80 ? 'good' : ''}">${best}%</div><div>Máy nghe được: <b>${esc(alts[0])}</b></div></div>`;
            show(best >= 80 ? 'good' : best >= 50 ? 'hard' : 'again');
          };
          r.onerror = ev => { $('#rvRes').innerHTML = `<p class="bad">Không nghe được (${esc(ev.error)}).</p>`; show(); };
          r.onend = () => { const m = $('#rvMic'); if (m) { m.disabled = false; m.textContent = '🎙 Nói lại'; } };
          r.start();
        };
      }
      $$('.rv-grade button', stage).forEach(b => b.onclick = () => grade(+b.dataset.q));
      const grade = g => {
        onKeyAct = null; n++;
        SRS.grade(x, g); this.track(c.id, 'reviews');
        if (g >= 3) { right++; this.track(c.id, 'correct'); } else { wrong.push(x); later({ x, ph: 'review' }, 3); }
        Sfx.beep(g < 3 ? 300 : 700 + g * 60, .07);
        // từ hay quên: gợi ý viết mẹo nhớ (mã hoá tinh tế)
        if (g < 3 && (x.lapses || 0) >= 3 && !x.note) {
          stage.innerHTML = `<div class="rv-q leech">${Art.creature('ghost', { size: 70, mood: 'sad' })}<h3>“${esc(x.word)}” hay bị quên quá!</h3>
            <p>Hãy tự nghĩ một <b>mẹo nhớ</b>: liên tưởng âm thanh, một hình ảnh buồn cười, hay câu chuyện ngắn gắn từ này với nghĩa “${esc(x.meaning || '')}”.</p>
            <textarea class="inp" id="lcNote" rows="2" placeholder="vd: ephemeral, nghe như “ép-phê-mơ” → mơ chỉ kéo dài một lát…"></textarea>
            <div class="row center"><button class="btn" id="lcSkip">Để sau</button><button class="btn pri" id="lcSave">Lưu mẹo nhớ</button></div></div>`;
          $('#lcSave').onclick = () => { x.note = $('#lcNote').value.trim(); Store.save('cards'); next(); };
          $('#lcSkip').onclick = next;
          return;
        }
        next();
      };
    };
    next();
  },

  /* ---------- 🎬 NGHE CHÉP VIDEO ---------- */
  videos(el, c) {
    const list = Store.list('videos').filter(v => v.courseId === c.id);
    el.innerHTML = `<div class="vd-head"><div><h2>🎬 Nghe chép video</h2><p class="muted">Dán link YouTube và phụ đề (hoặc chọn video trong máy kèm file phụ đề). App cắt thành từng câu: nghe, chép lại, so từng chữ, rồi bấm vào chữ để đào thành thẻ từ.</p></div><button class="btn pri big" id="vdAdd">＋ Thêm video</button></div>
      <div class="vd-list">${list.map(v => {
        const doneN = Object.keys(v.score || {}).length, pct = v.segs.length ? Math.round(doneN / v.segs.length * 100) : 0;
        return `<div class="vd-card" data-id="${v.id}">${v.yt ? `<img src="https://i.ytimg.com/vi/${esc(v.yt)}/mqdefault.jpg" alt="" loading="lazy">` : '<div class="vd-local">🎞️</div>'}<div class="vd-meta"><b>${esc(v.title)}</b><small>${v.segs.length} câu · đã chép ${doneN} (${pct}%)</small><div class="q-bar"><i style="width:${pct}%"></i></div></div><button class="mini-btn" data-del="${v.id}">✕</button></div>`;
      }).join('') || `<div class="empty big">${Art.creature('note', { size: 100, mood: 'joy' })}<p>Chưa có video nào. Chọn một video ngắn (2–5 phút) bạn thích để bắt đầu.</p></div>`}</div>
      <details class="science"><summary>Lấy phụ đề YouTube thế nào?</summary><ol>
        <li>Mở video trên YouTube → bấm <b>…Thêm</b> dưới video → <b>Hiện bản chép lời</b> (Show transcript).</li>
        <li>Bôi đen toàn bộ khung bản chép lời (có cả mốc thời gian), Ctrl+C, rồi dán vào ô phụ đề.</li>
        <li>Cũng dán được file <code>.srt</code> / <code>.vtt</code>. Nếu không có mốc thời gian, app vẫn chia câu, bạn tự bấm phát/dừng.</li></ol></details>`;
    $('#vdAdd').onclick = () => this.videoForm(c, () => this.videos(el, c));
    $$('.vd-card', el).forEach(d => d.onclick = async e => {
      if (e.target.dataset.del) { e.stopPropagation(); if (await confirmBox('Xoá video này?')) { Store.remove('videos', d.dataset.id); this.videos(el, c); } return; }
      this.videoPractice(el, c, Store.find('videos', d.dataset.id));
    });
  },
  parseSubs(text) {
    text = (text || '').replace(/\r/g, '').trim();
    const ts = t => { const m = (t || '').trim().match(/^(?:(\d+):)?(\d{1,2}):(\d{2})(?:[.,](\d{1,3}))?/); return m ? (+(m[1] || 0)) * 3600 + (+m[2]) * 60 + (+m[3]) + (m[4] ? +('0.' + m[4].padStart(3, '0')) : 0) : null; };
    const clean = t => t.replace(/<[^>]+>/g, '').replace(/\{[^}]+\}/g, '').replace(/^\s*-\s*/, '').replace(/\s+/g, ' ').trim();
    let segs = [];
    if (/-->/.test(text)) {
      text.split(/\n\s*\n/).forEach(b => {
        const lines = b.split('\n'); const i = lines.findIndex(l => l.includes('-->')); if (i < 0) return;
        const [a, z] = lines[i].split('-->'); const t = clean(lines.slice(i + 1).join(' '));
        if (t) segs.push({ s: ts(a), e: ts(z), t });
      });
    } else {
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      let cur = null;
      for (const l of lines) {
        const only = l.match(/^(\d{1,2}:\d{2}(?::\d{2})?)$/), inline = l.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s+(.+)$/);
        if (only) { cur = { s: ts(only[1]), t: '' }; segs.push(cur); }
        else if (inline) { cur = { s: ts(inline[1]), t: clean(inline[2]) }; segs.push(cur); }
        else if (cur) cur.t = (cur.t + ' ' + clean(l)).trim();
        else segs.push({ s: null, t: clean(l) });
      }
      segs = segs.filter(x => x.t);
      segs.forEach((x, i) => { if (x.s != null) x.e = segs[i + 1]?.s ?? x.s + 6; });
    }
    if (segs.every(x => x.s == null)) {           // không có mốc thời gian: tách theo câu
      segs = segs.flatMap(x => (x.t.match(/[^.!?。！？]+[.!?。！？]?/g) || [x.t]).map(t => ({ s: null, e: null, t: t.trim() }))).filter(x => x.t);
    }
    return segs.filter(x => x.t.length > 1 && !/^\[.*\]$/.test(x.t));
  },
  videoForm(c, after) {
    modal({
      title: '＋ Thêm video để nghe chép', wide: true,
      body: `<label class="lbl" for="vUrl">Link YouTube</label><input class="inp" id="vUrl" placeholder="https://www.youtube.com/watch?v=…">
        <div class="or">hoặc</div><button class="btn" id="vFile">📁 Chọn video/âm thanh trong máy</button> <span class="muted sm" id="vFileName"></span>
        <label class="lbl" for="vTitle">Tên video</label><input class="inp" id="vTitle" placeholder="vd: Phỏng vấn đầu tiên – NHK Easy">
        <label class="lbl" for="vSubs">Phụ đề / bản chép lời</label><textarea class="inp" id="vSubs" rows="10" placeholder="0:01\nこんにちは、皆さん。\n0:04\n今日は…\n\n(hoặc dán nội dung file .srt / .vtt)"></textarea>
        <p class="muted sm" id="vInfo"></p>`,
      onOpen: w => {
        let file = null;
        $('#vFile', w).onclick = async () => { file = await pickFile('video/*,audio/*'); if (file) { $('#vFileName', w).textContent = file.name; if (!$('#vTitle', w).value) $('#vTitle', w).value = file.name.replace(/\.[^.]+$/, ''); Lang._pendingFile = file; } };
        $('#vSubs', w).oninput = () => { const s = this.parseSubs($('#vSubs', w).value); $('#vInfo', w).textContent = s.length ? `Nhận ra ${s.length} câu${s[0].s != null ? ' có mốc thời gian' : ' (không có mốc thời gian)'}.` : ''; };
      },
      actions: [{ label: 'Huỷ' }, { label: '💾 Lưu & bắt đầu', cls: 'pri', onClick: w => {
        const url = $('#vUrl', w).value.trim(); const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
        const segs = this.parseSubs($('#vSubs', w).value);
        if (!m && !this._pendingFile) { toast('Cần link YouTube hoặc chọn một file video', 'err'); return false; }
        if (!segs.length) { toast('Cần dán phụ đề để biết câu nào cần chép', 'err'); return false; }
        const v = Store.upsert('videos', { id: uid(), courseId: c.id, title: $('#vTitle', w).value.trim() || (m ? 'Video YouTube' : 'Video trong máy'), yt: m ? m[1] : '', local: !m, segs, score: {}, pos: 0 });
        if (!m) this._files = { ...(this._files || {}), [v.id]: this._pendingFile };
        this._pendingFile = null; after && after();
      } }]
    });
  },
  ytApi() {
    return this._yt = this._yt || new Promise(res => {
      if (window.YT && window.YT.Player) return res(window.YT);
      const prev = window.onYouTubeIframeAPIReady; window.onYouTubeIframeAPIReady = () => { prev && prev(); res(window.YT); };
      const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; s.onerror = () => res(null); document.head.appendChild(s);
      setTimeout(() => res(window.YT && window.YT.Player ? window.YT : null), 10000);
    });
  },
  async videoPractice(el, c, v) {
    let i = Math.min(v.pos || 0, v.segs.length - 1), player = null, video = null, stopAt = null, timer = null, rate = 1;
    const ja = isJa(c);
    el.innerHTML = `<div class="vp">
      <div class="vp-l"><a href="javascript:void 0" id="vpBack" class="back">‹ Danh sách video</a><h3>${esc(v.title)}</h3>
        <div class="vp-player" id="vpPlayer">${v.local ? '<video id="vpVid" controls playsinline></video>' : '<div id="ytp"></div>'}</div>
        <div class="vp-ctrl"><button class="btn pri" id="vpPlay">▶ Phát câu (Ctrl+Space)</button><button class="btn" id="vpSlow">🐢 0.75×</button><button class="btn" id="vpPrev">‹ Câu trước</button><button class="btn" id="vpNext">Câu sau ›</button></div>
        <div class="vp-dots" id="vpDots"></div></div>
      <div class="vp-r"><div class="vp-n" id="vpN"></div>
        <textarea class="inp big" id="vpIn" rows="3" placeholder="Nghe rồi gõ lại câu bạn nghe được… (Enter để kiểm tra)"></textarea>
        <div class="row"><button class="btn pri" id="vpChk">Kiểm tra ↵</button><button class="btn" id="vpHint">💡 Gợi ý</button><button class="btn" id="vpShow">Xem đáp án</button></div>
        <div id="vpRes"></div></div></div>`;
    $('#vpBack').onclick = () => { cleanup(); this.videos(el, c); };
    const cleanup = () => { clearInterval(timer); try { player && player.destroy(); } catch (_) { } };
    this._gameStop = cleanup;
    if (v.local) {
      video = $('#vpVid'); const f = (this._files || {})[v.id];
      if (f) video.src = URL.createObjectURL(f);
      else $('#vpPlayer').insertAdjacentHTML('beforeend', `<button class="btn" id="vpPick">📁 Chọn lại file “${esc(v.title)}”</button><p class="muted sm">Trình duyệt không giữ file trong máy giữa các lần mở, nên cần chọn lại.</p>`);
      $('#vpPick') && ($('#vpPick').onclick = async () => { const f2 = await pickFile('video/*,audio/*'); if (f2) { this._files = { ...(this._files || {}), [v.id]: f2 }; video.src = URL.createObjectURL(f2); $('#vpPick').remove(); } });
    } else {
      const YT = await this.ytApi();
      if (!YT) $('#vpPlayer').innerHTML = `<p class="bad">Không tải được trình phát YouTube. <a href="https://youtu.be/${esc(v.yt)}" target="_blank" rel="noopener">Mở video trên YouTube ↗</a> rồi chép theo phụ đề bên phải.</p>`;
      else player = new YT.Player('ytp', { videoId: v.yt, playerVars: { rel: 0, modestbranding: 1, playsinline: 1, cc_load_policy: 0 } });
    }
    const now = () => video ? video.currentTime : (player && player.getCurrentTime ? player.getCurrentTime() : 0);
    const seg = () => v.segs[i];
    const play = (r = rate) => {
      const s = seg(); clearInterval(timer);
      if (s.s == null) { video ? (video.paused ? video.play() : video.pause()) : player?.getPlayerState?.() === 1 ? player.pauseVideo() : player?.playVideo?.(); return; }
      if (video) { video.playbackRate = r; video.currentTime = s.s; video.play(); }
      else if (player && player.seekTo) { player.setPlaybackRate(r); player.seekTo(s.s, true); player.playVideo(); }
      stopAt = s.e;
      timer = setInterval(() => { if (stopAt != null && now() >= stopAt - .05) { video ? video.pause() : player.pauseVideo(); clearInterval(timer); } }, 80);
    };
    const words = t => ja ? [...new Intl.Segmenter('ja', { granularity: 'word' }).segment(t)].filter(x => x.isWordLike).map(x => x.segment) : t.split(/\s+/).filter(Boolean);
    const draw = () => {
      $('#vpN').innerHTML = `Câu <b>${i + 1}</b> / ${v.segs.length}${seg().s != null ? ` · ${Math.floor(seg().s / 60)}:${String(Math.floor(seg().s % 60)).padStart(2, '0')}` : ''}`;
      $('#vpIn').value = ''; $('#vpRes').innerHTML = ''; $('#vpIn').focus();
      $('#vpDots').innerHTML = v.segs.map((_, k) => `<i class="${k === i ? 'cur' : ''} ${v.score[k] >= 90 ? 'ok' : v.score[k] != null ? 'part' : ''}" data-k="${k}" title="Câu ${k + 1}"></i>`).join('');
      v.pos = i; Store.save('videos');
    };
    const reveal = (pct, typed) => {
      const ans = seg().t;
      const toks = (ja ? [...new Intl.Segmenter('ja', { granularity: 'word' }).segment(ans)].map(x => ({ t: x.segment, w: x.isWordLike })) : ans.split(/(\s+)/).map(t => ({ t, w: /\S/.test(t) })));
      const typedSet = new Set(words(typed || '').map(normAns));
      $('#vpRes').innerHTML = `<div class="d-res">${pct != null ? `<div class="d-score ${pct >= 90 ? 'good' : ''}">${pct}%</div>` : ''}<div class="vp-ans">${toks.map(x => x.w ? `<span class="mw ${typed != null ? (typedSet.has(normAns(x.t)) || (ja && normAns(typed).includes(normAns(x.t))) ? 'd-ok' : 'd-bad') : ''}" title="Bấm để thêm thành thẻ từ">${esc(x.t)}</span>` : esc(x.t)).join('')}</div></div>
        <p class="muted sm">Bấm vào một chữ để đào thành thẻ từ (kèm câu này làm ví dụ). Enter để sang câu sau.</p>`;
      $$('.mw', $('#vpRes')).forEach(sp => sp.onclick = () => { Lang.quickAdd(sp.textContent, ans, { course: c, source: v.title, mined: true }); });
    };
    const check = () => {
      if ($('#vpRes').dataset.done === String(i)) { if (i < v.segs.length - 1) { i++; draw(); play(); } return; }
      const typed = $('#vpIn').value; if (!typed.trim()) return play();
      const pct = similarity(typed, seg().t);
      v.score[i] = Math.max(v.score[i] || 0, pct); Store.save('videos');
      if (pct >= 80) { this.track(c.id, 'video'); this.track(c.id, 'dict'); }
      Activity.add('dictation'); reveal(pct, typed); $('#vpRes').dataset.done = String(i);
      $$('#vpDots i')[i]?.classList.add(pct >= 90 ? 'ok' : 'part');
    };
    $('#vpPlay').onclick = () => play(); $('#vpSlow').onclick = () => play(.75);
    $('#vpPrev').onclick = () => { if (i > 0) { i--; draw(); play(); } };
    $('#vpNext').onclick = () => { if (i < v.segs.length - 1) { i++; draw(); play(); } };
    $('#vpChk').onclick = check; $('#vpShow').onclick = () => { reveal(null, null); $('#vpRes').dataset.done = String(i); };
    $('#vpHint').onclick = () => { const w = words(seg().t); const shown = w.map(x => x[0] + '·'.repeat(Math.max(0, [...x].length - 1))).join(ja ? '' : ' '); $('#vpRes').innerHTML = `<p class="hint">💡 ${esc(shown)}</p>`; };
    $('#vpDots').onclick = e => { const k = e.target.dataset.k; if (k !== undefined) { i = +k; draw(); play(); } };
    $('#vpIn').onkeydown = e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); check(); }
      if (e.key === ' ' && e.ctrlKey) { e.preventDefault(); play(); }
    };
    draw();
  }
});

/* ---------- nối vào lớp học: tab mới, đếm tiến độ, thẻ có hình & câu của tôi ---------- */
(() => {
  const origQuick = Lang.quickAdd.bind(Lang);
  Lang.quickAdd = function (word, sentence, opt = {}) {
    if (opt.course) return this.cardForm(opt.course, this.scope[opt.course.id] || {}, null, null, { word, sentence, mined: true, source: opt.source });
    this._mineNext = true;
    return origQuick(word, sentence);
  };
})();
