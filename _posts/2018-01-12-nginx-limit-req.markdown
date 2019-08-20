---
layout: post
title: Nginx limit_req
date: 2018-01-12 22:07:10 +0800
---

```nginx
limit_req_zone $binary_remote_addr zone=req_zone:10m rate=10r/s;

location /api {
    limit_req zone=req_zone burst=10 nodelay;
}
```

rate 限定单位时间内的请求数，burst 限定缓冲队列长度。上面配置是用 client IP 做请求限制，单 IP 限制每秒钟最多十个请求，也就是每 100ms 只能有一个请求，如果 100ms 内有超过一个的请求到达，会被放进 buffer 队列，大小由 burst 指定，所以 100ms 内的第 11 个请求会被 503。

1. `limit_req zone=req_zone;`
    - 严格按照 rate 来处理请求
    - 超过 rate 处理能力的直接 drop
    - 收到的请求无延时
2. `limit_req zone=req_zone burst=5;`
    - 按照 rate 设置处理请求
    - 设置一个大小为 5 的缓冲队列，在缓冲队列中的请求会被慢慢处理
    - 超出 burst+rate 的请求会被直接 drop
    - 收到的请求有延时
3. `limit_req zone=req_zone burst=5 nodelay;`
    - 按照 rate 设置处理请求
    - 设置一个大小为 5 的缓冲队列
    - 峰值处理能力是 burst+rate，超出处理能力的请求被直接 drop
    - 完成峰值请求后，缓冲队列不能再放入请求。假如 `rate=10r/s`, 峰值后这段时间没有请求过来，则每 0.01s 缓冲队列恢复一个缓冲请求的能力，直到恢复能缓冲 5 个请求
    - 收到的请求无延时

- [Rate Limiting with NGINX and NGINX Plus](https://www.nginx.com/blog/rate-limiting-nginx/)
- [Nginx下limit_req模块burst参数超详细解析](https://blog.csdn.net/hellow__world/article/details/78658041)
- [resty.limit.req](https://groups.google.com/d/msg/openresty/VY-LdQaEyDA/skf86NDHAAAJ)
