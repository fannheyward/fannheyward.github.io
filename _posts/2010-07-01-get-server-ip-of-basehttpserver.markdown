---
layout: post
title: "Get the server IP of BaseHTTPServer.BaseHTTPRequestHandler"
---

获取 BaseHTTPServer.BaseHTTPRequestHandler 请求服务器的 IP。

`serveradress = re.findall('Host: (.*?)\r\n',str(self.headers))`

