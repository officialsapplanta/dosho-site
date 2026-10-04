/*
 * Thin bridge between the Flutter web app and Daily's browser library
 * (daily-js.js, loaded first). The phone apps use Daily's native SDK; a browser
 * can't, so the web app drops Daily's call window into a <div> Flutter provides
 * and talks to it through these four functions.
 *
 *   start(containerId, url, token, optionsJson, onEvent)
 *   setAudio(containerId, on)   setVideo(containerId, on)
 *   stop(containerId)
 *
 * onEvent(name, detail) is told: joined, left, remote-joined, remote-left, error.
 */
(function () {
  var frames = {};

  window.doshoDaily = {
    start: function (containerId, url, token, optionsJson, onEvent) {
      var container = document.getElementById(containerId);
      if (!container || !window.Daily) {
        onEvent('error', 'Calling is not available in this browser.');
        return;
      }
      var opts = {};
      try { opts = JSON.parse(optionsJson || '{}'); } catch (e) { opts = {}; }

      var frame = window.Daily.createFrame(container, {
        iframeStyle: { width: '100%', height: '100%', border: '0', background: '#0D0710' },
        showLeaveButton: opts.showLeave !== false,
        showParticipantsBar: false,
        showFullscreenButton: false,
        theme: {
          colors: {
            accent: '#FF6FA8',
            accentText: '#1A0713',
            background: '#0D0710',
            backgroundAccent: '#1C1122',
            baseText: '#FAF2F6',
            border: '#311B36',
            mainAreaBg: '#0D0710',
            mainAreaBgAccent: '#241530',
            mainAreaText: '#FAF2F6',
            supportiveText: '#B29CAE'
          }
        }
      });
      frames[containerId] = frame;

      frame
        .on('joined-meeting', function () { onEvent('joined', ''); })
        .on('left-meeting', function () { onEvent('left', ''); })
        .on('participant-joined', function (e) {
          if (e && e.participant && !e.participant.local) onEvent('remote-joined', '');
        })
        .on('participant-left', function (e) {
          if (e && e.participant && !e.participant.local) onEvent('remote-left', '');
        })
        .on('error', function (e) {
          onEvent('error', (e && (e.errorMsg || (e.error && e.error.msg))) || 'Something went wrong with the call.');
        });

      frame
        .join({ url: url, token: token, startVideoOff: !!opts.audioOnly, startAudioOff: false })
        .catch(function (e) { onEvent('error', String((e && e.message) || e)); });
    },

    setAudio: function (containerId, on) {
      var f = frames[containerId];
      if (f) f.setLocalAudio(!!on);
    },

    setVideo: function (containerId, on) {
      var f = frames[containerId];
      if (f) f.setLocalVideo(!!on);
    },

    stop: function (containerId) {
      var f = frames[containerId];
      if (!f) return;
      delete frames[containerId];
      try { f.leave().catch(function () {}); } catch (e) {}
      setTimeout(function () { try { f.destroy(); } catch (e) {} }, 500);
    }
  };
})();
