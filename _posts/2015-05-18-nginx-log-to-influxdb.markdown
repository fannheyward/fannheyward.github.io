---
layout: post
title: Nginx log to InfluxDB
date: 2015-05-18 16:35:12 +0800
---

[InfluxDB][1] 是一个支持时间序列的数据库，自带 SQL-like 查询语言，很适合用作日志存储。配合 [Grafana][2] 面板展示，非常方便。

接下来要做的就是将 Nginx 日志写入 InfluxDB。常见的方法是用 [Logstash][3] 等工具收集 access.log/error.log 通过 filter 处理后写入 InfluxDB。这种方法对服务没有任何侵入，数据完全从 log 获取，缺点就是数据源单一，nginx.log 能纪录的东西比较有限。

再一个方式就是通过 ngx_lua 的 `log_by_lua`。log 阶段在 content 后，请求已完成，这时候做一些处理不会拖累服务。相对 nginx.log 可以通过 ngx_lua 获取更多信息，比如 `ngx.req` 获取请求信息，过滤 `ngx.var.uri` 将同一类请求合并，`ngx.var.http_cookie` 读取 cookie 针对登录用户做特殊纪录等。然后通过 InfluxDB 的 HTTP API 写入存储。

需要注意的是在 `log_by_lua` 里不能直接用 Cosocket，需要做一些特殊处理：创建 0 延时的 `ngx.timer`，在 timer 回调中用 Cosocket 发请求，参考 [lua-resty-logger-socket][4] 的实现，文档里也是建议这个方法 [Cosockets Not Available Everywhere][5].

InfluxDB 初步用下来还不错，HTTP API 方便不同服务接入，拿来做数据存储分析挺好。现在的问题是看 InfluxDB 的性能、稳定性如何。

[1]:http://influxdb.com
[2]:http://grafana.org/
[3]:https://www.elastic.co/products/logstash
[4]:https://github.com/cloudflare/lua-resty-logger-socket
[5]:https://github.com/openresty/lua-nginx-module#cosockets-not-available-everywhere
