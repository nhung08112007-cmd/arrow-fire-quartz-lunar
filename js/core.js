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
      provider: 'gemini', geminiKey: '', geminiModel: 'auto', apiKey: '', model: 'claude-opus-5-5', baseUrl: 'https://api.anthropic.com', showGate: true,
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

/* ---------- AI: Gemini (Google) hoặc Claude (Anthropic), gọi thẳng từ trình duyệt ----------
   Gemini: tự lấy danh sách model còn dùng được, tự chuyển model khi một model
   bị ngừng / hết hạn mức / quá tải, tự thử lại khi máy chủ bận. */
const GEMINI_API = 'https://generativelanguage.googleapis.com/v1beta';
const AI = {
  cfg() {
    const s = Store.settings();
    if (!s.provider) {                     // chuyển cài đặt cũ sang dạng mới
      if ((s.apiKey || '').startsWith('AIza')) { s.provider = 'gemini'; s.geminiKey = s.apiKey; s.apiKey = ''; }
      else s.provider = s.apiKey ? 'claude' : 'gemini';
      if (/^gemini/.test(s.model || '')) { s.geminiModel = 'auto'; s.model = 'claude-opus-5-5'; }
      Store.save('settings');
    }
    s.geminiModel = s.geminiModel || 'auto';
    return s;
  },
  ready() { const s = this.cfg(); return s.provider === 'gemini' ? !!s.geminiKey : !!s.apiKey; },
  needKey() {
    toast(`Cần nhập ${this.cfg().provider === 'gemini' ? 'Gemini' : 'Claude'} API key trong ⚙️ Cài đặt để dùng AI`, 'err', 3600);
    return false;
  },
  sleep: ms => new Promise(r => setTimeout(r, ms)),
  _bad: new Set(),          // model đã hỏng trong phiên này
  lastModel: '',

  /** messages: [{role, content}] hoặc prompt: string */
  async ask(opts) {
    const s = this.cfg();
    if (!this.ready()) { this.needKey(); throw new Error('Chưa có API key'); }
    return s.provider === 'gemini' ? this.askGemini(opts, s) : this.askClaude(opts, s);
  },

  /* ===== GEMINI ===== */
  async listGemini(force = false) {
    const s = this.cfg();
    if (!force && s.geminiList?.length && Date.now() - (s.geminiListAt || 0) < 12 * 3600000) return s.geminiList;
    const res = await fetch(`${GEMINI_API}/models?pageSize=200`, { headers: { 'x-goog-api-key': s.geminiKey } });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(this.explain(res.status, data?.error?.message || ''));
    const ver = n => { const m = n.match(/gemini-(\d+(?:\.\d+)?)/); return m ? parseFloat(m[1]) : 0; };
    const rank = n => /flash-lite/.test(n) ? 1 : /flash/.test(n) ? 0 : /pro/.test(n) ? 2 : 3;
    const list = (data.models || [])
      .filter(m => (m.supportedGenerationMethods || []).includes('generateContent'))
      .map(m => m.name.replace(/^models\//, ''))
      .filter(n => /^gemini-/.test(n) && !/(embed|image|tts|audio|live|native|robotics|computer|exp-\d|learnlm|aqa)/.test(n))
      .sort((a, b) => rank(a) - rank(b) || ver(b) - ver(a) || (/preview/.test(a) ? 1 : 0) - (/preview/.test(b) ? 1 : 0) || a.localeCompare(b));
    s.geminiList = list; s.geminiListAt = Date.now(); Store.save('settings');
    return list;
  },
  async askGemini({ system = '', prompt, messages, json = false }, s) {
    const msgs = messages || [{ role: 'user', content: prompt }];
    const body = {
      systemInstruction: { parts: [{ text: (system ? system + '\n' : '') + 'Luôn trả lời bằng tiếng Việt trừ khi được yêu cầu khác. Không dùng markdown thừa.' }] },
      contents: msgs.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
      generationConfig: json ? { responseMimeType: 'application/json' } : {}
    };
    let list = [];
    try { list = await this.listGemini(); } catch (e) { if (s.geminiModel === 'auto') throw e; }
    const order = [...new Set([s.geminiModel !== 'auto' ? s.geminiModel : null, s.geminiWorking, ...list].filter(Boolean))]
      .filter(m => !this._bad.has(m)).slice(0, 6);
    if (!order.length) throw new Error('Không còn model Gemini nào dùng được với key này. Bấm “Tải lại danh sách model” trong ⚙️ Cài đặt, hoặc thử lại sau.');
    let lastErr = '';
    for (const model of order) {
      for (let attempt = 0; attempt < 3; attempt++) {
        let res, data;
        try {
          res = await fetch(`${GEMINI_API}/models/${encodeURIComponent(model)}:generateContent`, {
            method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': s.geminiKey }, body: JSON.stringify(body)
          });
          data = await res.json().catch(() => ({}));
        } catch (e) { lastErr = 'Không kết nối được tới Google. Kiểm tra mạng.'; await this.sleep(1500); continue; }
        if (res.ok) {
          const cand = data.candidates?.[0];
          const text = (cand?.content?.parts || []).filter(p => !p.thought).map(p => p.text || '').join('').trim();
          if (!text) {
            if (data.promptFeedback?.blockReason || cand?.finishReason === 'SAFETY') throw new Error('Gemini từ chối nội dung này (bộ lọc an toàn).');
            lastErr = 'Model trả về rỗng.'; break;
          }
          if (s.geminiWorking !== model) { s.geminiWorking = model; Store.save('settings'); }
          this.lastModel = model;
          return text;
        }
        const msg = data?.error?.message || '';
        lastErr = this.explain(res.status, msg, model);
        console.warn('[Gemini]', model, res.status, msg);
        if (res.status === 400 && /api key/i.test(msg)) throw new Error(lastErr);
        if (res.status === 403) throw new Error(lastErr);
        const gone = res.status === 404 || /no longer available|not found|not supported/i.test(msg);
        const zeroQuota = res.status === 429 && /limit:\s*0\b/.test(msg);
        if (gone || zeroQuota) { this._bad.add(model); break; }           // đổi model khác
        if (res.status === 429) {                                         // vượt giới hạn theo phút
          const wait = (data?.error?.details || []).map(d => parseFloat(d.retryDelay)).find(x => x > 0) || 0;
          if (wait && wait <= 20 && attempt === 0) { toast(`Gemini bận, chờ ${Math.ceil(wait)} giây rồi thử lại…`, 'ok', 2500); await this.sleep(wait * 1000 + 300); continue; }
          break;
        }
        if (res.status >= 500 && attempt === 0) { await this.sleep(1200); continue; }  // quá tải: thử lại 1 lần rồi đổi model
        break;
      }
    }
    throw new Error(lastErr || 'Gemini không trả lời.');
  },

  /* ===== CLAUDE ===== */
  async askClaude({ system = '', prompt, messages, maxTokens = 4000, effort = 'low' }, s) {
    const body = {
      model: s.model || 'claude-opus-5-5',
      max_tokens: maxTokens,
      system: (system ? system + '\n' : '') + 'Luôn trả lời bằng tiếng Việt trừ khi được yêu cầu khác. Không dùng markdown thừa.',
      messages: messages || [{ role: 'user', content: prompt }],
      output_config: { effort }
    };
    const headers = { 'content-type': 'application/json', 'x-api-key': s.apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' };
    if (/^claude-(opus-5|fable-5|sonnet-5-5)/.test(body.model)) { headers['anthropic-beta'] = 'server-side-fallback-2026-07-01'; body.fallbacks = 'default'; }
    for (let attempt = 0; ; attempt++) {
      const res = await fetch((s.baseUrl || 'https://api.anthropic.com').replace(/\/$/, '') + '/v1/messages', { method: 'POST', headers, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if ((res.status === 529 || res.status >= 500 || res.status === 429) && attempt < 2) { await this.sleep(2000 * (attempt + 1)); continue; }
      if (!res.ok) throw new Error(this.explain(res.status, data?.error?.message || '', body.model));
      if (data.stop_reason === 'refusal') throw new Error('Claude từ chối yêu cầu này.');
      this.lastModel = body.model;
      return (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('').trim();
    }
  },

  /** đổi lỗi kỹ thuật thành câu dễ hiểu */
  explain(status, msg, model = '') {
    const m = model ? ` (${model})` : '';
    if (status === 400 && /api key/i.test(msg)) return 'API key không hợp lệ. Kiểm tra lại key trong ⚙️ Cài đặt.';
    if (status === 401) return 'API key không hợp lệ hoặc đã bị xoá.';
    if (status === 403) return 'Key không có quyền dùng API này (có thể do khu vực hoặc project chưa bật API).';
    if (status === 404 || /no longer available|not found/i.test(msg)) return `Model${m} đã ngừng hoặc không tồn tại.`;
    if (status === 429 && /limit:\s*0\b/.test(msg)) return `Model${m} không có hạn mức miễn phí cho key này. Hãy dùng model Flash hoặc bật thanh toán trong Google AI Studio.`;
    if (status === 429 && /per day|PerDay/i.test(msg)) return 'Đã hết hạn mức miễn phí hôm nay. Thử lại vào ngày mai, hoặc bật thanh toán trong Google AI Studio.';
    if (status === 429) return 'Gửi quá nhiều yêu cầu trong thời gian ngắn hoặc hết hạn mức. Đợi một chút rồi thử lại.';
    if (status === 529 || status === 503 || /high demand|overloaded/i.test(msg)) return `Model${m} đang quá tải. Thử lại sau ít phút.`;
    if (/credit balance/i.test(msg)) return 'Tài khoản Claude hết credit. Nạp thêm trong Claude Console.';
    return msg || ('Lỗi HTTP ' + status);
  },

  async json(opts) {
    const txt = await this.ask({ ...opts, json: true, system: (opts.system || '') + '\nCHỈ trả về JSON hợp lệ, không có chữ nào khác, không bọc trong ```.' });
    const a = txt.indexOf('{'), b = txt.lastIndexOf('}');
    const a2 = txt.indexOf('['), b2 = txt.lastIndexOf(']');
    let s = txt;
    if (a2 >= 0 && (a < 0 || a2 < a)) s = txt.slice(a2, b2 + 1); else if (a >= 0) s = txt.slice(a, b + 1);
    try { return JSON.parse(s); } catch (e) { throw new Error('AI trả về dữ liệu không đúng định dạng. Bấm lại lần nữa nhé.'); }
  },
  /** chạy kèm hiệu ứng "đang nghĩ" trên nút */
  async withSpinner(btn, fn) {
    if (!this.ready()) return this.needKey();
    const old = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spin">✦</span> Đang nghĩ…'; }
    try { return await fn(); }
    catch (e) { toast('AI lỗi: ' + e.message, 'err', 6000); }
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
