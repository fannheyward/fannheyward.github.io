---
layout: post
title: "Get parameters from BaseHTTPServer http POST request"
---

Get parameters from BaseHTTPServer http POST request. 获取 BaseHTTPServer.BaseHTTPRequestHandler POST 请求参数。

```
def do_POST(self):
    params = cgi.parse_qs(self.rfile.read(int(self.headers.getheader('Content-Length'))))
```

