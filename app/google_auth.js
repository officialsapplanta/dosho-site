/*
 * "Continue with Google" for the web app. Opens Google's account popup and resolves with an access
 * token, which the server checks with Google (see backend googleAuthService.ts). Rejects if the
 * person closes the popup.
 */
(function () {
  window.doshoGoogle = {
    token: function (clientId) {
      return new Promise(function (resolve, reject) {
        if (!window.google || !google.accounts || !google.accounts.oauth2) {
          reject(new Error('Google sign-in is not available in this browser.'));
          return;
        }
        var client = google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'openid email profile',
          callback: function (r) {
            if (r && r.access_token) resolve(r.access_token);
            else reject(new Error((r && r.error) || 'cancelled'));
          },
          error_callback: function (e) { reject(new Error((e && e.type) || 'cancelled')); }
        });
        client.requestAccessToken();
      });
    }
  };
})();
