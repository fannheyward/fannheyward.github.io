---
layout: post
title: "BaseHTTPServer serving Gziped content"
---


BaseHTTPServer 使用 gzip 压缩处理 html/xml 文档。

```
import cStringIO, gzip
zbuf = cStringIO.StringIO()
zfile = gzip.GzipFile(mode='wb', compresslevel=6, fileobj=zbuf)
zfile.write(xmlstring)
zfile.close()

compressed_content = zbuf.getvalue()

self.send_response(200)
self.send_header("Content-Type", "text/xml")
self.send_header("Content-Length", str(len(compressed_content)))
self.send_header("Content-Encoding","gzip")
self.end_headers()
self.wfile.write(compressed_content)
self.wfile.flush()
```

