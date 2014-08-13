---
layout: post
title: "Memcache using notes"
---

> telnet 127.0.0.1 11211

Commands:

> get/set/add/replace/append/prepend/incr/decr/delete

> flush_all

> stats

cmd_get 查询缓存操作，uptime 是运行秒数，cmd_get/uptime 是平均每秒请求缓存次数。

缓存命中率 = `get_hits/cmd_get`

