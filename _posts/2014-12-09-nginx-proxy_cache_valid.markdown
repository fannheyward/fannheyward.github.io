---
layout: post
title: "Nginx proxy_cache_valid"
date: 2014-12-09 17:02:09 +0800
---

[proxy_cache][1] 可以缓存 upstream 响应，其中 `proxy_cache_valid` 设置缓存有效时间，需要注意的是 Nginx 检查缓存是否有效的优先级问题。根据[文档][2]和 [Igor][3]，Nginx 判断缓存有效的顺序是：

1. `X-Accel-Expires`
2. `Expires/Cache-Control`
3. `proxy_cache_valid `

也就是说 Nginx 会优先用 upstream 设置的缓存有效期，这种情况下 Nginx 相当于 Client，如果想忽略缓存直接到 upstream 更新，类似浏览器忽略本地缓存，可以这样设置：

`proxy_ignore_headers X-Accel-Expires Expires Cache-Control;`

另外 `proxy_cache_path ... inactive=10m;` 不受 upstream 影响，缓存文件在指定时间内没有被再次访问会被清理删除。

参考:

* 文档 [1][4]，[2][2]
* [Nginx缓存详细配置][5]
* [nginx缓存优先级(缓存问题者必看)][6]

[1]:http://fann.im/blog/2014/08/30/nginx-proxy-cache/
[2]:http://wiki.nginx.org/HttpProxyModule#proxy_cache_valid
[3]:http://forum.nginx.org/read.php?2,2182,2185#msg-2185
[4]:http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_valid
[5]:http://www.firefoxbug.com/index.php/archives/2089/
[6]:http://www.ttlsa.com/nginx/nginx-cache-priority/
