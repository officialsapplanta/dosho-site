// An earlier version of this site may have installed a service worker that keeps showing an old
// copy of the page. This replacement removes itself and clears whatever it stored.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    try { var keys = await caches.keys(); await Promise.all(keys.map(function (k) { return caches.delete(k); })); } catch (e) {}
    try { await self.registration.unregister(); } catch (e) {}
    try {
      var list = await self.clients.matchAll({ type: 'window' });
      list.forEach(function (c) { if (c.url && 'navigate' in c) c.navigate(c.url); });
    } catch (e) {}
  })());
});
