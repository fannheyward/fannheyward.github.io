---
layout: post
title: "Nginx Gzip"
date: 2014-06-06 21:22:50 +0800
---

```
gzip on;
gzip_types text/plain text/css text/javascript application/json application/x-javascript;
```

nginx.conf 配置 `gzip on;` 即可打开 gzip 压缩，需要注意的是默认情况下 nginx 只对 `text/html` 类型进行压缩，所以需要设置 `gzip_types`。

参考文档 [ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_types).

