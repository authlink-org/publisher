(function(d,t) {
  var BASE_URL="https://support.authlink.org";
  var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
  g.src=BASE_URL+"/packs/js/sdk.js";
  g.defer = true;
  g.async = true;
  s.parentNode.insertBefore(g,s);
  g.onload=function(){
    window.chatwootSDK.run({
      websiteToken: '5RZ4fyqo4imM9ayVwgrPFHUX',
      baseUrl: BASE_URL
    })
  }
})(document,"script");