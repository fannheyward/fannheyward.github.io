---
layout: post
title: Nginx DNS resolver
date: 2015-01-28 18:34:35 +0800
---

nginx 通过 `proxy_pass` 和 upstream server 通信的时候需要手动指定 resolver。某些时候 DNS 解析失败就会出现这个错误：

```
domain.com could not be resolved.
```

可以指定多个 DNS 并重置域名 TTL 延长 nginx 解析缓存来保障解析成功率：

```
resolver 223.5.5.5 223.6.6.6 1.2.4.8 114.114.114.114 valid=3600s;
```

如果还有解析错误，可以用 dnsmasq 在本地自建 DNS，顺带还有加速解析的好处：

```
#/etc/dnsmasq.conf
domain-needed
bogus-priv
cache-size=51200
listen-address=127.0.0.1

#server=223.5.5.5
resolv-file=/etc/resolv.conf
```

另外需要注意的是 `proxy_pass` 并不是每次请求都会进行解析，如果 upstream IP 频繁变动，需要强制解析:

```
# via http://forum.nginx.org/read.php?2,215830,215832#msg-215832
resolver 127.0.0.1;
set $backend "foo.example.com";
proxy_pass http://$backend;
```
