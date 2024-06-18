   /* Load remote Batch SDK JavaScript code */
   (function(b,a,t,c,h,e,r){h='batchSDK';b[h]=b[h]||function() {
    (b[h].q=b[h].q||[]).push(arguments)};e=a.createElement(t),r=a.getElementsByTagName(t)[0];
    e.async=1;e.src=c;r.parentNode.insertBefore(e,r);})(window,document,'script','https://via.batch.com/v4/bootstrap.min.js');

/* Initiate Batch SDK opt-in UI configuration (native prompt) */
var batchSDKUIConfig = {
    native: {}
};

/* Use a specific configuration for Firefox and Safari browsers (custom prompt) */
if (navigator.userAgent.indexOf("Firefox") !== -1 || (navigator.userAgent.indexOf("Safari") !== -1 &&
navigator.userAgent.indexOf("Chrome") === -1)) {
    batchSDKUIConfig = {
        alert: {
          icon: 'https://secure.url.to.your.icon.jpg'
        }
    }
}

/* Finalize the Batch SDK setup */
batchSDK('setup', {
    apiKey: '398DF304310C4FB9BE72E9F44C828314',
    subdomain: 'acoxi5g5',
    authKey: '2.rd70oRdmyefmNTkd3/L6ifVAXIvU3CIBbKHrErcXj2s=',
    // dev: true, // remove this for prod
    vapidPublicKey: 'BJLIEZO4CiEbdupO8mOgneg7cO7vSYkF+tHsea61P4gGDN07KtqcqRD7uclF/7sQ+bw9ea57+3MNwzPEybDvXSE=',
    ui: batchSDKUIConfig,
    // defaultIcon: 'https://path.to/my/logo-192/png', // for Chrome desktop
    // smallIcon: 'https://path.to/my/icon-96.png', // for Chrome Android
    
});

batchSDK((api) => {
    console.log("ICI")
    api.ui.show('alert')
})