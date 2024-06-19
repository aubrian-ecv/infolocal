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
  apiKey: '5EEFD6DCE1E246A3BF8FB8C5D93695A8',
  subdomain: 'vercel4',
  authKey: '2.XLXUuKOUABED6fGZkJlqg1+EuIGVeZXmCbkaA7XTFDk=',
  dev: true, // remove this for prod
  vapidPublicKey: 'BBqhs9fD6dxcj+BA64T2EDBFsz3sSWw1vfVTycfoQ00+Lr1JfEV84POJ6T6JQqByNBKmsTW+KgJ5bTPDvFnAVh8=',
  ui: batchSDKUIConfig,
  // defaultIcon: 'https://path.to/my/logo-192/png', // for Chrome desktop
  // smallIcon: 'https://path.to/my/icon-96.png', // for Chrome Android
});

