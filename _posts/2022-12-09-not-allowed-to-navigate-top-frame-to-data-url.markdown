---
layout: post
title: Not allowed to navigate top frame to data URL
date: 2022-12-09 16:10:07 +0800
---

```js
function base64ToArrayBuffer(_base64Str) {
  var binaryString = window.atob(_base64Str);
  var binaryLen = binaryString.length;
  var bytes = new Uint8Array(binaryLen);
  for (var i = 0; i < binaryLen; i++) {
    var ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
}

function showDocument(_base64Str, _contentType) {
  var byte = base64ToArrayBuffer(_base64Str);
  var blob = new Blob([byte], {type: _contentType});
  document.location.replace(URL.createObjectURL(blob));
}


showDocument('PGh0bWw+Cgo8Ym9keT4KICBoZWxsbyB3b3JsZC4KPC9ib2R5PgoKPC9odG1sPgo=', 'text/html');
```

- https://itechowl.wordpress.com/2020/01/27/javascript-not-allowed-to-navigate-top-frame-to-data-url-chrome/