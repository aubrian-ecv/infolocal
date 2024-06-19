/* Load remote Batch SDK JavaScript code */
(function (b, a, t, c, h, e, r) {
  h = "batchSDK";
  b[h] =
    b[h] ||
    function () {
      (b[h].q = b[h].q || []).push(arguments);
    };
  (e = a.createElement(t)), (r = a.getElementsByTagName(t)[0]);
  e.async = 1;
  e.src = c;
  r.parentNode.insertBefore(e, r);
})(window, document, "script", "https://via.batch.com/v4/bootstrap.min.js");

/* Initiate Batch SDK opt-in UI configuration (native prompt) */
var batchSDKUIConfig = {
  banner: {
    autoShow: true,
    text: "We use push notifications to send you the latest news and updates.",
    fixed: true,
    btnSub: "Susbcribe",
  }
};

/* Use a specific configuration for Firefox and Safari browsers (custom prompt) */
if (
  navigator.userAgent.indexOf("Firefox") !== -1 ||
  (navigator.userAgent.indexOf("Safari") !== -1 &&
    navigator.userAgent.indexOf("Chrome") === -1)
) {
  batchSDKUIConfig = {
    alert: {
      icon: "https://secure.url.to.your.icon.jpg",
    },
  };
}

/* Finalize the Batch SDK setup */
batchSDK('setup', {
  apiKey: '1CDAD62D38AD4E0CACAC117DF4F74542',
  subdomain: 'vercel3',
  authKey: '2.lKNhn8jUhh/c4/apowk1jtkksfUribj7Hx+KGVdvgYk=',
  // dev: true, // remove this for prod
  vapidPublicKey: 'BCMrV+c5l1BUNd4TDeb7WNpB55Z3WZoePJWWQwKx/u3XUnb1g+F8fPXEiMbXKPkt3qMuD6kx++gOUvB+5d1Mn2Q=',
  ui: batchSDKUIConfig,
  // defaultIcon: 'https://path.to/my/logo-192/png', // for Chrome desktop
  // smallIcon: 'https://path.to/my/icon-96.png', // for Chrome Android
  
});

