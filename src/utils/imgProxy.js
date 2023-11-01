// src/utils/imgProxy.js

import jsSHA from 'jssha';

function hex2a(hexx) {
  var hex = hexx.toString(); //force conversion
  var str = '';
  for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

export function generateProxyUrl(opts) {
  var encoded_url = btoa(opts.url).replace(/=/g, "").replace(/\//g, '_').replace(/\+/g, '-');
  var path = "/rs:" + opts.resize + ":" + opts.width + ":" + opts.height + ":" + opts.enlarge +
             "/g:" + opts.gravity  + "/" + encoded_url + "." + opts.extension;
  var shaObj = new jsSHA("SHA-256", "BYTES");
  shaObj.setHMACKey(opts.key, "HEX");
  shaObj.update(hex2a(opts.salt));
  shaObj.update(path);
  var hmac = shaObj.getHMAC("B64").replace(/=/g, "").replace(/\//g, '_').replace(/\+/g, '-');
  return opts.proxy_url + "/" + hmac + path;
}
