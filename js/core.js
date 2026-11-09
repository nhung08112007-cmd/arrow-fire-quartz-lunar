/* =========================================================
   CORE — tiện ích, kho dữ liệu (IndexedDB), router, modal, AI
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtDate = ts => ts ? new Date(ts).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
const fmtDateTime = ts => ts ? new Date(ts).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }) : '';
const stripHtml = h => { const d = document.createElement('div'); d.innerHTML = h || ''; return d.textContent || ''; };
const wordCount = t => (t.trim().match(/\S+/g) || []).length;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const hashStr = s => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h); };
const debounce = (fn, ms = 400) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const today = () => new Date().toISOString().slice(0, 10);
const DAY = 86400000;

/* ---------- Kho dữ liệu: bộ nhớ + IndexedDB ---------- */
const Store = {
  data: {},
  db: null,
  keys: ['posts', 'archive', 'quotes', 'books', 'courses', 'tbooks', 'units', 'cards', 'grammar', 'letters', 'settings', 'pet', 'stamps', 'playlist', 'log', 'chat'],
  async init() {
    try {
      this.db = await new Promise((res, rej) => {
        const r = indexedDB.open('chutchi', 1);
        r.onupgradeneeded = () => r.result.createObjectStore('kv');
        r.onsuccess = () => res(r.result);
        r.onerror = () => rej(r.error);
      });
      await Promise.all(this.keys.map(k => new Promise(res => {
        const tx = this.db.transaction('kv').objectStore('kv').get(k);
        tx.onsuccess = () => { if (tx.result !== undefined) this.data[k] = tx.result; res(); };
        tx.onerror = () => res();
      })));
    } catch (e) {
      console.warn('IndexedDB không khả dụng, dùng localStorage', e);
      this.keys.forEach(k => { try { const v = localStorage.getItem('ct_' + k); if (v) this.data[k] = JSON.parse(v); } catch (_) { } });
    }
  },
  get(k, def) { if (this.data[k] === undefined) this.data[k] = structuredClone(def); return this.data[k]; },
  list(k) { return this.get(k, []); },
  save(k) {
    const v = this.data[k];
    if (this.db) {
      try { this.db.transaction('kv', 'readwrite').objectStore('kv').put(v, k); }
      catch (e) { toast('Không lưu được: ' + e.message, 'err'); }
    } else {
      try { localStorage.setItem('ct_' + k, JSON.stringify(v)); } catch (e) { toast('Bộ nhớ đầy!', 'err'); }
    }
  },
  find(k, id) { return this.list(k).find(x => x.id === id); },
  upsert(k, item) {
    const arr = this.list(k);
    const i = arr.findIndex(x => x.id === item.id);
    item.updated = Date.now();
    if (i >= 0) arr[i] = item; else { item.created = item.created || Date.now(); arr.unshift(item); }
    this.save(k);
    return item;
  },
  remove(k, id) { const arr = this.list(k); const i = arr.findIndex(x => x.id === id); if (i >= 0) arr.splice(i, 1); this.save(k); },
  settings() {
    return this.get('settings', {
      apiKey: '', model: 'claude-opus-5-5', baseUrl: 'https://api.anthropic.com', showGate: true,
      theme: 'day', name: 'Bạn', yearGoal: 24
    });
  },
  exportAll() { const o = {}; this.keys.forEach(k => o[k] = this.data[k]); return o; },
  importAll(o) { this.keys.forEach(k => { if (o[k] !== undefined) { this.data[k] = o[k]; this.save(k); } }); }
};

/* ---------- Toast ---------- */
function toast(msg, type = 'ok', ms = 2600) {
  const t = document.createElement('div');
  t.className = 'toast t-' + type;
  t.innerHTML = `<span class="toast-av">${Art.mini(type === 'err' ? 'sad' : 'happy')}</span><span>${msg}</span>`;
  $('#toasts').appendChild(t);
  setTimeout(() => t.classList.add('out'), ms);
  setTimeout(() => t.remove(), ms + 400);
}

/* ---------- Modal ---------- */
function modal({ title = '', body = '', wide = false, full = false, onOpen, actions = [], cls = '' }) {
  const wrap = document.createElement('div');
  wrap.className = 'modal-wrap';
  wrap.innerHTML = `<div class="modal ${wide ? 'wide' : ''} ${full ? 'full' : ''} ${cls}">
    <div class="modal-head"><h3>${title}</h3><button class="x" data-close>✕</button></div>
    <div class="modal-body">${body}</div>
    ${actions.length ? `<div class="modal-foot">${actions.map((a, i) => `<button class="btn ${a.cls || ''}" data-act="${i}">${a.label}</button>`).join('')}</div>` : ''}
  </div>`;
  const close = () => { wrap.classList.add('out'); setTimeout(() => wrap.remove(), 200); document.removeEventListener('keydown', onKey); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  wrap.addEventListener('mousedown', e => { if (e.target === wrap) close(); });
  wrap.querySelectorAll('[data-close]').forEach(b => b.onclick = close);
  wrap.querySelectorAll('[data-act]').forEach(b => b.onclick = async () => {
    const a = actions[+b.dataset.act];
    const r = a.onClick ? await a.onClick(wrap, close) : undefined;
    if (r !== false) close();
  });
  $('#layer').appendChild(wrap);
  onOpen && onOpen(wrap, close);
  return { el: wrap, close };
}
function confirmBox(msg) {
  return new Promise(res => modal({
    title: 'Chắc chưa nè?', body: `<div class="confirm">${Art.creature('cloud', { mood: 'wow', size: 70 })}<p>${msg}</p></div>`,
    actions: [{ label: 'Thôi', onClick: () => res(false) }, { label: 'Đồng ý', cls: 'pri', onClick: () => res(true) }]
  }));
}
function promptBox(title, def = '', ph = '') {
  return new Promise(res => {
    let done = false;
    modal({
      title, body: `<input class="inp" id="pbx" value="${esc(def)}" placeholder="${esc(ph)}">`,
      onOpen: w => { const i = w.querySelector('#pbx'); i.focus(); i.select(); i.onkeydown = e => { if (e.key === 'Enter') { done = true; res(i.value); w.querySelector('[data-close]').click(); } }; },
      actions: [{ label: 'Huỷ', onClick: () => { done = true; res(null); } }, { label: 'OK', cls: 'pri', onClick: w => { done = true; res(w.querySelector('#pbx').value); } }]
    });
  });
}

/* ---------- Router (hash) ---------- */
const Router = {
  routes: [],
  cleanup: null,
  on(re, fn) { this.routes.push([re, fn]); },
  go(p) { location.hash = p; },
  resolve() {
    const path = location.hash.slice(1) || '/';
    if (this.cleanup) { try { this.cleanup(); } catch (_) { } this.cleanup = null; }
    const view = $('#view');
    for (const [re, fn] of this.routes) {
      const m = path.match(re);
      if (m) {
        view.className = 'view';
        view.scrollTop = 0; window.scrollTo(0, 0);
        const r = fn(view, ...m.slice(1).map(decodeURIComponent));
        if (typeof r === 'function') this.cleanup = r;
        Nav.mark(path);
        return;
      }
    }
    view.innerHTML = `<div class="empty big">${Art.creature('ghost', { size: 120 })}<p>Lạc đường mất rồi…</p><a class="btn pri" href="#/">Về sảnh</a></div>`;
  }
};

/* ---------- Nhật ký hoạt động -> nuôi thú ---------- */
const Activity = {
  add(type, amount = 1) {
    const log = Store.get('log', {});
    const d = today();
    log[d] = log[d] || {};
    log[d][type] = (log[d][type] || 0) + amount;
    Store.save('log');
    if (window.Pet) Pet.gain(type, amount);
  },
  streak() {
    const log = Store.get('log', {});
    let s = 0; let d = new Date();
    for (; ;) {
      const k = d.toISOString().slice(0, 10);
      if (log[k]) { s++; d = new Date(d - DAY); } else break;
    }
    return s;
  }
};

/* ---------- AI (Claude Messages API, gọi thẳng từ trình duyệt) ---------- */
const AI = {
  ready() { return !!Store.settings().apiKey; },
  needKey() {
    toast('Cần nhập API key trong ⚙️ Cài đặt để dùng AI', 'err', 3600);
    return false;
  },
  /** messages: [{role, content}] hoặc prompt: string */
   async ask({ system = '', prompt, messages, maxTokens = 4000 }) {
    const s = Store.settings();
    if (!s.apiKey) { this.needKey(); throw new Error('Chưa có API key'); }
    const msgs = messages || [{ role: 'user', content: prompt }];
    const body = {
      systemInstruction: { parts: [{ text: (system ? system + '\n' : '') + 'Luôn trả lời bằng tiếng Việt trừ khi được yêu cầu khác. Không dùng markdown thừa.' }] },
      contents: msgs.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
      generationConfig: { maxOutputTokens: maxTokens }
    };
    const model = s.model || 'gemini-3.8-flash';
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': s.apiKey },
      body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error?.message || ('Lỗi HTTP ' + res.status));
    const cand = data.candidates?.[0];
    if (!cand || cand.finishReason === 'SAFETY') throw new Error('AI từ chối hoặc không trả lời được.');
    return (cand.content?.parts || []).map(p => p.text || '').join('').trim();
  },
  async json(opts) {
    const txt = await this.ask({ ...opts, system: (opts.system || '') + '\nCHỈ trả về JSON hợp lệ, không có chữ nào khác, không bọc trong ```.' });
    const a = txt.indexOf('{'), b = txt.lastIndexOf('}');
    const a2 = txt.indexOf('['), b2 = txt.lastIndexOf(']');
    let s = txt;
    if (a2 >= 0 && (a < 0 || a2 < a)) s = txt.slice(a2, b2 + 1); else if (a >= 0) s = txt.slice(a, b + 1);
    return JSON.parse(s);
  },
  /** chạy kèm hiệu ứng "đang nghĩ" trên nút */
  async withSpinner(btn, fn) {
    if (!this.ready()) return this.needKey();
    const old = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spin">✦</span> Đang nghĩ…'; }
    try { return await fn(); }
    catch (e) { toast('AI lỗi: ' + e.message, 'err', 5000); }
    finally { if (btn) { btn.disabled = false; btn.innerHTML = old; } }
  }
};

/* ---------- Đọc to (TTS) ---------- */
const Speech = {
  speak(text, lang = 'en-US', rate = 1) {
    if (!('speechSynthesis' in window)) return toast('Trình duyệt không hỗ trợ đọc to', 'err');
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang; u.rate = rate;
    const v = speechSynthesis.getVoices().find(v => v.lang.replace('_', '-').toLowerCase().startsWith(lang.toLowerCase().slice(0, 2)));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
    return u;
  },
  stop() { 'speechSynthesis' in window && speechSynthesis.cancel(); }
};

/* ---------- File -> dataURL (ảnh nén) ---------- */
function fileToDataURL(file, maxW = 1400) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => {
      if (!file.type.startsWith('image/') || file.type === 'image/gif') return res(r.result);
      const img = new Image();
      img.onload = () => {
        const sc = Math.min(1, maxW / img.width);
        const c = document.createElement('canvas');
        c.width = img.width * sc; c.height = img.height * sc;
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        res(c.toDataURL('image/jpeg', 0.86));
      };
      img.onerror = () => res(r.result);
      img.src = r.result;
    };
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}
function pickFile(accept = 'image/*') {
  return new Promise(res => {
    const i = document.createElement('input');
    i.type = 'file'; i.accept = accept;
    i.onchange = () => res(i.files[0]);
    i.click();
  });
}
function download(name, text, type = 'text/plain') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

/* ---------- Kéo-vuốt ngang cho các kệ ---------- */
function dragScroll(el) {
  let down = false, sx = 0, sl = 0, moved = 0, v = 0, lastX = 0, raf;
  el.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch') return; // touch dùng cuộn gốc
    down = true; moved = 0; sx = lastX = e.clientX; sl = el.scrollLeft; cancelAnimationFrame(raf);
    el.classList.add('dragging');
  });
  window.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx));
    v = e.clientX - lastX; lastX = e.clientX;
    el.scrollLeft = sl - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!down) return; down = false; el.classList.remove('dragging');
    const glide = () => { if (Math.abs(v) < .5) return; el.scrollLeft -= v; v *= .93; raf = requestAnimationFrame(glide); };
    glide();
  });
  el.addEventListener('click', e => { if (moved > 6) { e.stopPropagation(); e.preventDefault(); } }, true);
  el.addEventListener('wheel', e => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { el.scrollLeft += e.deltaY; e.preventDefault(); } }, { passive: false });
}
