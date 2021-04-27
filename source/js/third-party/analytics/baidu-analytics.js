/* global _hmt */

if (!window._hmt) window._hmt = [];

(function() {
   var host = window.location.host;
   if (host.indexOf("127.0.0.1") == -1 && host.indexOf("localhost") == -1) {
     var hm = document.createElement("script");
     hm.src = "https://hm.baidu.com/hm.js?" + CONFIG.baidu_analytics;
     var s = document.getElementsByTagName("script")[0];
     s.parentNode.insertBefore(hm, s);
   }
})();

document.addEventListener('pjax:success', () => {
  _hmt.push(['_trackPageview', location.pathname]);
});
