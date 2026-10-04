/*
 * Browser notifications for the web app. subscribe(publicKey) asks permission, registers the
 * push service worker and returns the browser's push subscription as JSON (or '' if the
 * person declined or this browser can't do it).
 */
(function () {
  function toBytes(b64) {
    var pad = '='.repeat((4 - (b64.length % 4)) % 4);
    var raw = atob((b64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }
  window.doshoPush = {
    subscribe: async function (publicKey) {
      try {
        if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) return '';
        var permission = Notification.permission;
        if (permission === 'default') permission = await Notification.requestPermission();
        if (permission !== 'granted') return '';
        var reg = await navigator.serviceWorker.register('push/sw.js', { scope: 'push/' });
        await navigator.serviceWorker.ready;
        var sub = await reg.pushManager.getSubscription();
        if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: toBytes(publicKey) });
        return JSON.stringify(sub);
      } catch (e) { return ''; }
    }
  };
})();
