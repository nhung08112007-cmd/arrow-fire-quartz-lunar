/* =========================================================
   CHỌN THẺ: đánh dấu “đã biết – chỉ ôn”, học ngay thẻ đã chọn, đặt lại thành thẻ mới
   ========================================================= */
Object.assign(Lang, {
  /* thẻ đã biết: bỏ qua bước học từ mới, xếp lần ôn đầu rải trong 4–10 ngày tới */
  markKnown(cards) {
    const now = Date.now(); let n = 0;
    cards.forEach(x => {
      if (x.seen) return;
      const iv = 4 + Math.floor(Math.random() * 7);
      x.fs = { s: iv, d: 4, last: now }; x.seen = true; x.reps = 1; x.lapses = 0; x.interval = iv; x.due = now + iv * DAY;
      x.history = [...(x.history || []), [now, 5]]; x.known = true; n++;
    });
    if (n) { Store.save('cards'); this.track(cards[0]?.courseId, 'known', n); }
    return n;
  },
  resetCards(cards) {
    cards.forEach(x => { delete x.fs; delete x.known; delete x.leechFix; x.seen = false; x.reps = 0; x.lapses = 0; x.interval = 0; x.due = undefined; x.history = []; });
    Store.save('cards');
  },
  /* thanh công cụ khi đang chọn thẻ */
  pickBar(el, c, sc, pick, visible, redraw, rerender) {
    let bar = $('#pkBar', el);
    if (!pick) { bar && bar.remove(); return; }
    if (!bar) { bar = document.createElement('div'); bar.id = 'pkBar'; bar.className = 'pk-bar'; el.appendChild(bar); }
    const sel = [...pick].map(id => Store.find('cards', id)).filter(Boolean);
    const fresh = sel.filter(x => !x.seen).length;
    bar.innerHTML = `<b>Đã chọn ${sel.length}</b><span class="muted sm">(${fresh} chưa học)</span>
      <button class="btn sm" data-a="all">Chọn hết (${visible().length})</button><button class="btn sm" data-a="none">Bỏ chọn</button>
      <span class="grow"></span>
      <button class="btn sm ok" data-a="known" ${fresh ? '' : 'disabled'}>✓ Đã biết, chỉ ôn</button>
      <button class="btn sm pri" data-a="learn" ${sel.length ? '' : 'disabled'}>▶ Học ngay</button>
      <button class="btn sm" data-a="reset" ${sel.length - fresh ? '' : 'disabled'}>↺ Đặt lại thẻ mới</button>
      <button class="btn sm" data-a="close" title="Thoát chế độ chọn">✕</button>`;
    bar.onclick = async e => {
      const a = e.target.closest('[data-a]')?.dataset.a; if (!a) return;
      if (a === 'all') { visible().forEach(x => pick.add(x.id)); redraw(); }
      if (a === 'none') { pick.clear(); redraw(); }
      if (a === 'close') { rerender(); }
      if (a === 'known') {
        if (fresh > 30 && !(await confirmBox(`Đánh dấu ${fresh} thẻ là “đã biết”? Các thẻ này sẽ không qua bước học từ mới, mà vào lịch ôn (lần ôn đầu rải trong 4–10 ngày tới). Có thể đặt lại sau.`))) return;
        const n = this.markKnown(sel);
        toast(`✓ Đã chuyển ${n} thẻ sang ôn tập — lần ôn đầu rải trong 4–10 ngày tới`, 'ok', 4000);
        pick.clear(); redraw();
      }
      if (a === 'reset') {
        if (!(await confirmBox(`Đặt lại ${sel.length - fresh} thẻ thành thẻ mới? Lịch ôn và lịch sử của các thẻ này sẽ bị xoá.`))) return;
        this.resetCards(sel.filter(x => x.seen)); toast('Đã đặt lại thành thẻ mới'); pick.clear(); redraw();
      }
      if (a === 'learn') {
        const due = sel.filter(x => x.seen), fr = sel.filter(x => !x.seen);
        bar.remove(); this.runSession(el, c, shuffle(due), fr, sc);
      }
    };
  }
});
