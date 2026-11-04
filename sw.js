// Kohr 세무신고 — 홈 화면 앱용 서비스 워커
// 항상 인터넷의 최신 파일을 먼저 받고(업데이트가 바로 반영되도록), 연결이 없을 때만 저장해 둔 화면을 보여 준다.
const CACHE = 'kohr-tax-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-180.png'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;      // 서버(구글)·GitHub 확인 요청은 건드리지 않음
  if (url.searchParams.has('v')) return;               // 새 버전 확인·설명서 PDF는 항상 인터넷에서
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
  );
});
