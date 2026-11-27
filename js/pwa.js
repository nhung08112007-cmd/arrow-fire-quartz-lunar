/* =========================================================
   CÀI WEB NHƯ ỨNG DỤNG (PWA) + GIỮ DỮ LIỆU CỐ ĐỊNH
   ========================================================= */
const PWA = {
  prompt: null,
  installed() { return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; },
  ios() { return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); },
  async persisted() { try { return await navigator.storage?.persisted?.(); } catch (_) { return false; } },
  async persist() { try { return await navigator.storage?.persist?.(); } catch (_) { return false; } },
  init() {
    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
      navigator.serviceWorker.register('sw.js').catch(() => { });
    }
    window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); this.prompt = e; this.status(); });
    window.addEventListener('appinstalled', () => { this.prompt = null; toast('📲 Đã cài Chữ-tchi vào máy!', 'ok'); this.persist(); this.status(); });
    // xin giữ dữ liệu: trình duyệt sẽ không tự xoá khi máy thiếu bộ nhớ / lâu không mở
    setTimeout(() => this.persist(), 3000);
  },
  section() {
    return `<section class="set-sec" id="pwaSec"><h2>📲 Cài vào điện thoại / máy tính</h2>
      <p class="muted">Cài Chữ-tchi như một ứng dụng: có biểu tượng trên màn hình chính, mở toàn màn hình, <b>vẫn học được khi mất mạng</b> (sau lần mở đầu có mạng). Trên iPhone, cài vào màn hình chính còn giúp Safari <b>không tự xoá dữ liệu</b> khi bạn lâu không mở web.</p>
      <div class="row"><button class="btn pri" id="pwaInstall" hidden>📲 Cài ngay</button><button class="btn" id="pwaPersist">🔒 Giữ dữ liệu cố định</button></div>
      <div id="pwaHow" class="muted"></div>
      <p class="muted sm" id="pwaStatus"></p></section>`;
  },
  async status() {
    const st = document.getElementById('pwaStatus'); if (!st) return;
    const btn = document.getElementById('pwaInstall'), how = document.getElementById('pwaHow');
    const per = await this.persisted();
    btn.hidden = !this.prompt || this.installed();
    how.innerHTML = this.installed() ? '' : this.ios()
      ? `<ol class="tips"><li>Mở web bằng <b>Safari</b> (không phải trong Zalo/Messenger).</li><li>Bấm nút <b>Chia sẻ</b> <span class="kbd">⬆︎</span> ở thanh dưới.</li><li>Chọn <b>Thêm vào MH chính</b> (Add to Home Screen) → <b>Thêm</b>.</li></ol>`
      : this.prompt ? '' : `<ol class="tips"><li>Android (Chrome): bấm menu <b>⋮</b> → <b>Cài đặt ứng dụng</b> / <b>Thêm vào màn hình chính</b>.</li><li>Máy tính (Chrome/Edge): bấm biểu tượng <b>cài đặt</b> ở cuối thanh địa chỉ.</li></ol>`;
    st.innerHTML = [this.installed() ? '✅ Đang chạy như ứng dụng đã cài.' : '', per ? '🔒 Trình duyệt đã đồng ý giữ dữ liệu cố định.' : '⚠️ Dữ liệu chưa được giữ cố định — trình duyệt có thể dọn khi máy đầy bộ nhớ.', 'serviceWorker' in navigator ? '' : 'Trình duyệt này không hỗ trợ chạy ngoại tuyến.'].filter(Boolean).join(' ');
  },
  bind(view) {
    this.status();
    $('#pwaInstall', view).onclick = async () => {
      if (!this.prompt) return;
      this.prompt.prompt(); const r = await this.prompt.userChoice; this.prompt = null;
      if (r.outcome === 'accepted') this.persist();
      this.status();
    };
    $('#pwaPersist', view).onclick = async () => {
      const ok = await this.persist();
      toast(ok ? '🔒 Đã giữ dữ liệu cố định trên máy này' : 'Trình duyệt chưa đồng ý. Hãy cài web vào màn hình chính rồi thử lại (Safari/Chrome thường chỉ đồng ý với web đã cài hoặc hay dùng).', ok ? 'ok' : 'err', 6000);
      this.status();
    };
  }
};
