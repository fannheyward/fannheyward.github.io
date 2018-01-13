---
layout: post
title: Nginx limit_req
date: 2018-01-12 22:07:10 +0800
---

```
limit_req_zone $binary_remote_addr zone=req_zone:10m rate=10r/s;

location /api {
    limit_req zone=req_zone burst=10 nodelay;
}
```

rate 限定单位时间内的请求数，burst 限定缓冲队列长度。上面配置是用 client IP 做请求限制，单 IP 限制每秒钟最多十个请求，也就是每 100ms 只能有一个请求，如果 100ms 内有超过一个的请求到达，会被放进 buffer 队列，大小由 burst 指定，所以 100ms 内的第 11 个请求会被 503。

[Rate Limiting with NGINX and NGINX Plus](https://www.nginx.com/blog/rate-limiting-nginx/)
