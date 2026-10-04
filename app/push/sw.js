/*
 * Shows Dosho notifications in the browser. Lives in its own folder (and so its own
 * service-worker scope) so it never collides with Flutter's own service worker.
 */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('push', function (event) {
  var msg = {};
  try { msg = event.data ? event.data.json() : {}; } catch (e) { msg = { title: 'Dosho', body: event.data ? event.data.text() : '' }; }
  event.waitUntil(self.registration.showNotification(msg.title || 'Dosho', {
    body: msg.body || '',
    icon: '/app/icons/Icon-192.png',
    badge: '/app/icons/Icon-192.png',
    data: msg.data || {}
  }));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  var target = '/app/';
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].url.indexOf('/app/') !== -1 && 'focus' in list[i]) return list[i].focus();
    }
    return self.clients.openWindow(target);
  }));
});
