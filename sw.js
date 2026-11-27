/* Service worker của Chữ-tchi: dùng được khi mất mạng.
   - File của web (cùng địa chỉ): lấy bản mới trên mạng trước (chờ tối đa 4 giây), mất mạng thì dùng bản đã lưu.
   - Font Google, thư viện CDN, dữ liệu nét chữ: dùng bản đã lưu, cập nhật ngầm.
   - Không bao giờ lưu các yêu cầu tới AI hay GitHub (dữ liệu riêng tư). */
const CACHE = 'chutchi-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png'];
const STATIC_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

/* lưu bản mới, xoá các bản cũ cùng đường dẫn (khác ?v=) để bộ nhớ không phình */
async function put(req, res) {
  if (!res || !res.ok || res.type === 'opaque' && !STATIC_HOSTS.includes(new URL(req.url).host)) return;
  const c = await caches.open(CACHE), u = new URL(req.url);
  if (u.origin === self.location.origin && u.search) {
    for (const k of await c.keys()) { const ku = new URL(k.url); if (ku.pathname === u.pathname && ku.search !== u.search) c.delete(k); }
  }
  await c.put(req, res);
}
function timeout(ms) { return new Promise((_, no) => setTimeout(() => no(new Error('timeout')), ms)); }

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.origin === self.location.origin) {
    e.respondWith((async () => {
      const net = fetch(req).then(r => { put(req, r.clone()); return r; });
      try { return await Promise.race([net, timeout(4000)]); }
      catch (_) {
        const hit = await caches.match(req) || (req.mode === 'navigate' ? await caches.match('./index.html') || await caches.match('./') : null);
        if (hit) return hit;
        return net;   // chưa có bản lưu: đợi mạng tiếp
      }
    })());
    return;
  }
  if (STATIC_HOSTS.includes(u.host)) {
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(r => { put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
  }
});
