!function(){function e(e){var t={passive:!0,capture:!1},n=""+e;console.log("Method: "+n),n.indexOf("preventDefault")!==-1,EventTarget.prototype.addEventListener=function(n,a,r){var i="object"==typeof r,v=i?r.capture:r;r=i?r:{},r.passive=void 0!==r.passive?r.passive:t.passive,r.capture=void 0!==v?v:t.capture,e.call(this,n,a,r)}}function t(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("test",null,t)}catch(e){}return e}var n=t();if(n){var a=EventTarget.prototype.addEventListener;e(a)}}();