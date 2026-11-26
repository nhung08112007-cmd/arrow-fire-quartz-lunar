/* =========================================================
   ĐỒNG BỘ GIỮA CÁC MÁY qua GitHub Gist (bí mật)
   - Mã truy cập GitHub chỉ lưu trong trình duyệt máy này (localStorage), không nằm trong dữ liệu đồng bộ.
   - API key AI (…Key trong cài đặt) KHÔNG bao giờ được gửi lên.
   - Gộp 3 chiều: so với bản lúc đồng bộ lần trước để biết bên nào sửa/xoá gì;
     cả hai cùng sửa một mục → giữ bản mới hơn (theo updated / lần ôn gần nhất).
   ========================================================= */
const Sync = {
  FILE: 'chutchi-sync.json',
  LS_TOKEN: 'ct_gh_token', LS_META: 'ct_sync_meta', LS_BASE: 'ct_sync_base',
  busy: false, _t: null,

  ls(k, v) {
    try {
      if (v === undefined) { const s = localStorage.getItem(k); return s ? JSON.parse(s) : null; }
      if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v));
    } catch (_) { return null; }
  },
  token() { return this.ls(this.LS_TOKEN) || ''; },
  meta() { return this.ls(this.LS_META) || {}; },
  setMeta(o) { this.ls(this.LS_META, { ...this.meta(), ...o }); },
  on() { return !!this.token(); },

  /* ---------- băm nhanh để biết một mục có đổi không ---------- */
  hash(v) {
    const s = JSON.stringify(v) ?? '';
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0).toString(36) + s.length.toString(36);
  },
  /* mảng các đối tượng có id → so theo từng mục; đối tượng thường → so theo từng khoá; còn lại → cả khối */
  kind(v) {
    if (Array.isArray(v)) return v.every(x => x && typeof x === 'object' && x.id != null) ? 'list' : 'blob';   // mảng rỗng tính là list
    return v && typeof v === 'object' ? 'map' : 'blob';
  },
  entries(v, kind) { return kind === 'list' ? v.map(x => [String(x.id), x]) : kind === 'map' ? Object.entries(v) : [['*', v]]; },
  /* bỏ API key khỏi cài đặt trước khi gửi */
  clean(k, v) {
    if (k !== 'settings' || !v) return v;
    const o = { ...v }; Object.keys(o).forEach(f => { if (/key$/i.test(f)) delete o[f]; }); return o;
  },
  snapshot() { const o = {}; Store.keys.forEach(k => { if (Store.data[k] !== undefined) o[k] = this.clean(k, Store.data[k]); }); return o; },
  baseOf(data) {
    const b = {};
    Object.entries(data).forEach(([k, v]) => { const kd = this.kind(v); b[k] = { kind: kd, h: {} }; this.entries(v, kd).forEach(([id, x]) => b[k].h[id] = this.hash(x)); });
    return b;
  },
  stamp(x) { return x && typeof x === 'object' ? Math.max(x.updated || 0, x.fs?.last || 0, x.last || 0, x.at || 0, x.created || 0) : 0; },
  /* cả hai máy cùng sửa một mục */
  pick(l, r) {
    const num = o => o && typeof o === 'object' && !Array.isArray(o) && Object.values(o).every(v => typeof v === 'number');
    if (num(l) && num(r)) { const o = { ...l }; Object.entries(r).forEach(([f, v]) => o[f] = Math.max(o[f] || 0, v)); return o; }   // nhật ký đếm: lấy số lớn hơn
    const tl = this.stamp(l), tr = this.stamp(r);
    return tr > tl ? r : l;
  },

  /* gộp một khoá; trả về giá trị mới và có đổi so với máy này không */
  mergeKey(k, L, R, B) {
    if (R === undefined) return { v: L, changed: false };
    if (L === undefined) return { v: R, changed: true };
    const kl = this.kind(L), kr = this.kind(R);
    const base = B && B.kind === kl && B.kind === kr ? B.h : null;
    if (kl !== kr || kl === 'blob') {
      const hl = this.hash(L), hr = this.hash(R), hb = B?.h?.['*'];
      if (hl === hr) return { v: L, changed: false };
      if (hb === hl) return { v: R, changed: true };   // chỉ máy kia đổi
      if (hb === hr) return { v: L, changed: false };  // chỉ máy này đổi
      const empty = v => v == null || (typeof v === 'object' && !Object.keys(v).length);
      if (hb == null && empty(L) !== empty(R)) return empty(L) ? { v: R, changed: true } : { v: L, changed: false };
      const v = this.pick(L, R); return { v, changed: v !== L };
    }
    const bh = base || {};
    const lm = new Map(this.entries(L, kl)), rm = new Map(this.entries(R, kl));
    const out = new Map(); let changed = false;
    lm.forEach((lv, id) => {
      if (!rm.has(id)) {                       // máy kia không có
        if (id in bh && this.hash(lv) === bh[id]) { changed = true; return; }   // máy kia đã xoá, máy này không sửa → xoá
        out.set(id, lv); return;                                                 // mới ở máy này (hoặc máy này sửa sau khi kia xoá)
      }
      const rv = rm.get(id), hl = this.hash(lv), hr = this.hash(rv);
      if (hl === hr) { out.set(id, lv); return; }
      let v;
      if (bh[id] === hl) v = rv; else if (bh[id] === hr) v = lv; else v = this.pick(lv, rv);
      if (v !== lv) changed = true;
      out.set(id, v);
    });
    const order = [...lm.keys()];
    rm.forEach((rv, id) => {
      if (lm.has(id)) return;
      if (id in bh && this.hash(rv) === bh[id]) return;   // máy này đã xoá
      out.set(id, rv); changed = true; order.push(id);
    });
    if (kl === 'map') { const o = {}; order.forEach(id => { if (out.has(id)) o[id] = out.get(id); }); return { v: o, changed }; }
    // giữ thứ tự: mục của máy này giữ nguyên chỗ, mục mới từ máy kia chèn sau mục đứng trước nó bên máy kia
    const res = [...lm.keys()].filter(id => out.has(id));
    const pos = new Map(res.map((id, i) => [id, i]));
    let prev = null;
    const ins = [];
    [...rm.keys()].forEach(id => { if (!lm.has(id) && out.has(id)) ins.push([prev, id]); if (out.has(id)) prev = id; });
    ins.forEach(([p, id]) => {
      const at = p != null && pos.has(p) ? res.indexOf(p) + 1 : 0;
      res.splice(at, 0, id); pos.set(id, at);
    });
    return { v: res.map(id => out.get(id)), changed };
  },
  merge(local, remote, base) {
    const out = {}, changedKeys = [];
    new Set([...Object.keys(local), ...Object.keys(remote)]).forEach(k => {
      if (!Store.keys.includes(k)) return;
      const r = this.mergeKey(k, local[k], remote[k], base?.[k]);
      out[k] = r.v; if (r.changed) changedKeys.push(k);
    });
    return { data: out, changedKeys };
  },

  /* ---------- nén để gist gọn ---------- */
  async pack(data) {
    const json = JSON.stringify(data);
    if (typeof CompressionStream === 'undefined') return JSON.stringify({ format: 'chutchi-sync@1', at: Date.now(), z: false, data });
    const buf = await new Response(new Blob([json]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer();
    let bin = ''; const u = new Uint8Array(buf); for (let i = 0; i < u.length; i += 0x8000) bin += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
    return JSON.stringify({ format: 'chutchi-sync@1', at: Date.now(), z: true, data: btoa(bin) });
  },
  async unpack(txt) {
    const o = JSON.parse(txt);
    if (o.format !== 'chutchi-sync@1') throw new Error('Gist không đúng định dạng của Chữ-tchi');
    if (!o.z) return o.data;
    const bin = atob(o.data), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return JSON.parse(await new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream('gzip'))).text());
  },

  /* ---------- GitHub API ---------- */
  async api(path, opt = {}) {
    const r = await fetch('https://api.github.com' + path, { ...opt, headers: { Accept: 'application/vnd.github+json', Authorization: 'Bearer ' + this.token(), ...(opt.body ? { 'Content-Type': 'application/json' } : {}) } });
    if (r.status === 401) throw new Error('Mã GitHub không hợp lệ hoặc đã hết hạn');
    if (r.status === 403 || r.status === 404) { const t = await r.text(); throw new Error(r.status === 404 && path.startsWith('/gists/') ? 'GONE' : 'GitHub từ chối: mã cần quyền “gist”. ' + t.slice(0, 80)); }
    if (!r.ok) throw new Error('GitHub lỗi ' + r.status);
    return r.json();
  },
  async findGist() {
    const id = this.meta().gistId;
    if (id) return id;
    for (let page = 1; page <= 5; page++) {
      const list = await this.api(`/gists?per_page=100&page=${page}`);
      const g = list.find(g => g.files && g.files[this.FILE]);
      if (g) { this.setMeta({ gistId: g.id }); return g.id; }
      if (list.length < 100) break;
    }
    return null;
  },
  async pull(id) {
    const g = await this.api('/gists/' + id);
    const f = g.files?.[this.FILE];
    if (!f) return null;
    const txt = f.truncated ? await (await fetch(f.raw_url)).text() : f.content;
    return this.unpack(txt);
  },

  /** đồng bộ: kéo về → gộp → ghi vào máy → đẩy lên */
  async run({ quiet = false } = {}) {
    if (!this.on() || this.busy) return;
    if (!navigator.onLine) { if (!quiet) toast('Đang ngoại tuyến, sẽ đồng bộ khi có mạng', 'err'); return; }
    this.busy = true; this.status('⏳ Đang đồng bộ…');
    try {
      Store.flush();
      const local = this.snapshot();
      let id = await this.findGist(), remote = null;
      if (id) { try { remote = await this.pull(id); } catch (e) { if (e.message === 'GONE') { this.setMeta({ gistId: null }); id = null; } else throw e; } }
      const base = this.ls(this.LS_BASE);
      let mode = 'merge';
      if (remote && !base && !quiet && this.hasData(local)) {   // lần đầu bật trên máy đã có dữ liệu
        this.status('Chờ bạn chọn…'); mode = await this.askFirst();
        if (!mode) { this.status(); return; }
      }
      const { data, changedKeys } = !remote ? { data: local, changedKeys: [] }
        : mode === 'cloud' ? { data: remote, changedKeys: Store.keys.filter(k => k !== 'settings' && this.hash(remote[k]) !== this.hash(local[k])) }
        : this.merge(local, remote, base);
      // ghi phần mới vào máy này (giữ API key của máy này)
      changedKeys.forEach(k => {
        let v = data[k];
        if (k === 'settings') { const mine = Store.data.settings || {}; v = { ...v }; Object.keys(mine).forEach(f => { if (/key$/i.test(f)) v[f] = mine[f]; }); }
        if (v === undefined) delete Store.data[k]; else Store.data[k] = v;
        this._applying = true; Store.saveNow(k); this._applying = false;
      });
      const body = await this.pack(data);
      const remoteSame = remote && this.hash(remote) === this.hash(data);
      if (!remoteSame) {
        if (id) await this.api('/gists/' + id, { method: 'PATCH', body: JSON.stringify({ files: { [this.FILE]: { content: body } } }) });
        else { const g = await this.api('/gists', { method: 'POST', body: JSON.stringify({ public: false, description: 'Chữ-tchi · dữ liệu đồng bộ (đừng xoá)', files: { [this.FILE]: { content: body } } }) }); this.setMeta({ gistId: g.id }); }
      }
      this.ls(this.LS_BASE, this.baseOf(data));
      this.setMeta({ last: Date.now(), err: '' });
      this.status();
      if (changedKeys.length) this.refresh(quiet);
      else if (!quiet) toast('☁️ Đã đồng bộ', 'ok');
    } catch (e) {
      this.setMeta({ err: e.message }); this.status();
      if (!quiet || /Mã GitHub|từ chối/.test(e.message)) toast('☁️ Đồng bộ lỗi: ' + e.message, 'err', 5000);
    } finally { this.busy = false; }
  },
  hasData(d) { return ['posts', 'courses', 'cards', 'archive', 'books', 'tasks'].some(k => (d[k] || []).length); },
  askFirst() {
    return new Promise(res => {
      let done = false;
      const m = modal({
        title: '☁️ Đồng bộ lần đầu trên máy này',
        body: `<div class="confirm">${Art.creature('cloud', { mood: 'wow', size: 70 })}<p>Trên mây đã có dữ liệu từ máy khác, và máy này cũng đang có dữ liệu riêng.</p>
          <p><b>Gộp cả hai</b>: giữ mọi thứ ở cả hai nơi (nên chọn nếu bạn đã học/viết trên cả hai máy).<br><b>Dùng dữ liệu trên mây</b>: bỏ dữ liệu hiện có ở máy này, lấy y nguyên bản trên mây (nên chọn nếu máy này mới chỉ có dữ liệu mẫu).</p></div>`,
        actions: [{ label: 'Dùng dữ liệu trên mây', onClick: () => { done = true; res('cloud'); } }, { label: 'Gộp cả hai', cls: 'pri', onClick: () => { done = true; res('merge'); } }]
      });
      const t = setInterval(() => { if (!m.el.isConnected) { clearInterval(t); if (!done) res(null); } }, 300);
    });
  },
  /* có dữ liệu mới từ máy khác → vẽ lại trang (trừ khi đang soạn thảo / mở hộp thoại) */
  refresh(quiet) {
    const editing = document.querySelector('.modal-wrap') || /^#\/(viet|doc)\//.test(location.hash) || document.activeElement?.isContentEditable;
    if (editing) { toast('☁️ Đã nhận dữ liệu mới từ máy khác — tải lại trang để thấy đủ', 'ok', 5000); return; }
    try { Router.resolve(); } catch (_) { }
    if (typeof Nav !== 'undefined') try { Nav.render(); } catch (_) { }
    toast('☁️ Đã cập nhật dữ liệu từ máy khác', 'ok');
  },
  /* sau khi sửa dữ liệu: đợi yên 20 giây rồi đẩy lên */
  schedule() {
    if (!this.on() || this._applying) return;
    clearTimeout(this._t); this._t = setTimeout(() => this.run({ quiet: true }), 20000);
  },
  status(txt) {
    const el = document.getElementById('syncStatus'); if (!el) return;
    const m = this.meta();
    el.innerHTML = txt || (!this.on() ? 'Chưa bật.' : m.err ? `⚠️ ${esc(m.err)}` : m.last ? `✅ Đồng bộ lần cuối: ${new Date(m.last).toLocaleString('vi')}` : 'Đã lưu mã, chưa đồng bộ lần nào.');
  },
  init() {
    const orig = Store.saveNow.bind(Store);
    Store.saveNow = k => { orig(k); this.schedule(); };
    if (!this.on()) return;
    setTimeout(() => this.run({ quiet: true }), 1500);
    let lastVis = Date.now();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && Date.now() - lastVis > 30000) this.run({ quiet: true });
      if (document.visibilityState === 'hidden') { lastVis = Date.now(); if (this._t) { clearTimeout(this._t); this.run({ quiet: true }); } }
    });
    window.addEventListener('online', () => this.run({ quiet: true }));
  },

  /* ---------- khối trong trang Cài đặt ---------- */
  section() {
    return `<section class="set-sec" id="syncSec"><h2>☁️ Đồng bộ giữa các máy</h2>
      <p class="muted">Dữ liệu (lớp học, thẻ, tiến độ, bài viết, lịch…) được cất vào một <b>Gist bí mật</b> trên tài khoản GitHub của bạn. Mọi máy dán cùng một mã sẽ tự gộp dữ liệu khi mở web và sau mỗi lần sửa. API key AI <b>không</b> được gửi lên; mã GitHub chỉ lưu trên máy này.</p>
      <details class="ai-adv"><summary>Cách lấy mã GitHub (1 phút)</summary>
        <ol class="tips"><li>Mở <a href="https://github.com/settings/tokens/new?scopes=gist&description=Chu-tchi%20sync" target="_blank" rel="noopener">trang tạo mã GitHub</a> (đã đăng nhập GitHub).</li>
        <li>Ô <i>Expiration</i> chọn thời hạn bạn muốn (vd <b>No expiration</b> hoặc 1 năm). Chỉ tích quyền <b>gist</b> (đã tích sẵn).</li>
        <li>Bấm <b>Generate token</b>, sao chép mã bắt đầu bằng <code>ghp_</code>.</li>
        <li>Dán vào ô dưới đây trên <b>máy tính</b> rồi bấm Lưu. Làm lại bước dán trên <b>điện thoại</b> (dùng cùng mã).</li></ol></details>
      <div class="row"><input class="inp" id="syncTok" type="password" autocomplete="off" placeholder="${this.on() ? '•••••• (đã lưu mã)' : 'Dán mã GitHub (ghp_…)'}" style="flex:1;min-width:200px">
        <button class="btn pri" id="syncSave">Lưu & đồng bộ</button></div>
      <div class="row"><button class="btn" id="syncNow" ${this.on() ? '' : 'disabled'}>☁️ Đồng bộ ngay</button><button class="btn danger" id="syncOff" ${this.on() ? '' : 'disabled'}>Tắt trên máy này</button></div>
      <p class="muted sm" id="syncStatus"></p></section>`;
  },
  bind(view) {
    this.status();
    $('#syncSave', view).onclick = async () => {
      const t = $('#syncTok', view).value.trim();
      if (!t) { toast('Dán mã GitHub vào ô trước đã', 'err'); return; }
      if (!/^(ghp_|github_pat_|gho_)/.test(t) && !(await confirmBox('Mã này trông không giống mã GitHub (thường bắt đầu bằng ghp_). Vẫn lưu?'))) return;
      this.ls(this.LS_TOKEN, t); this.setMeta({ gistId: null, err: '' }); this.ls(this.LS_BASE, null);
      $('#syncTok', view).value = ''; $('#syncTok', view).placeholder = '•••••• (đã lưu mã)';
      $('#syncNow', view).disabled = $('#syncOff', view).disabled = false;
      await this.run();
    };
    $('#syncNow', view).onclick = () => this.run();
    $('#syncOff', view).onclick = async () => {
      if (!(await confirmBox('Tắt đồng bộ trên máy này? Dữ liệu trên máy và trên Gist vẫn giữ nguyên.'))) return;
      this.ls(this.LS_TOKEN, null); this.ls(this.LS_META, null); this.ls(this.LS_BASE, null);
      $('#syncNow', view).disabled = $('#syncOff', view).disabled = true; $('#syncTok', view).placeholder = 'Dán mã GitHub (ghp_…)'; this.status();
    };
  }
};
