---
layout: post
title: Nginx proxy_next_upstream non_idempotent
date: 2019-01-28 18:12:40 +0800
---

在 Nginx 做反向代理的时候，我们一般会配置 `proxy_next_upstream`，如果某个 upstream 超时或出错，自动切换到下一个 upstram。

```
upstream backend{
  server 192.168.0.1;
  server 192.168.0.2;
}
location /example/ {
   proxy_pass http://backend;

   proxy_next_upstream error timeout http_500 non_idempotent;
}
```

这里有一个地方需要注意，`non_idempotent`，Nginx 默认对 non-idempotent 请求，比如 **POST**/LOCK/PATCH，是不进行重试。常见的情况就是 POST 请求出错后不会重试，需要加上该设置。

> normally, requests with a non-idempotent method (POST, LOCK, PATCH) are not passed to the next server if a request has been sent to an upstream server (1.9.13); enabling this option explicitly allows retrying such requests;
