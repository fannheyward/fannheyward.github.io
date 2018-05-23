---
layout: post
title: "Performance on Optimization"
date: 2014-04-21 22:39:35 +0800
---

Donald Knuth:

> Premature optimization is the root of all evil.

高性能的程序是一个程序员应该有的追求，但是过早的性能优化往往起到反作用，浪费时间，拖慢进度等等。如何尽量少的优化投入同时达到高性能？

1. 一个高性能框架，赢在起跑线，比如 `ngx_lua`。
1. 一套成熟高效的技术架构解决方案，比如 Tornado + PostgreSQL + Redis。
1. 一开始就按照最佳实践写代码，把常规需要优化的地方降到最少。
1. 不要只局限于软件层，硬件升级往往比软件优化更给力，比如 SSD。

