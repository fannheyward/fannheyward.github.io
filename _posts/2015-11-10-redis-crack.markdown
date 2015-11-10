---
layout: post
title: Redis Crack
date: 2015-11-10 23:10:40 +0800
---

> [http://www.antirez.com/news/96](http://www.antirez.com/news/96)

昨天一服务器被黑，从 auth.log 发现有陌生 IP 居然可以通过 public key 登录，排查后发现是因为 Redis 不规范使用造成的：

1. root 启动了 redis 实例，默认端口 6379，没有 bind IP，没有 auth 验证
2. 被扫描到可以远程登录，`config set dir /root/.ssh` 修改数据保存路径，`config set dbfilename "authorized_keys"` 修改数据保存文件名
3. 把 key 写入 redis，bgsave，即可用 key 登录

简单威力大。修复预防：

1. 禁止 root 启动 redis
2. Bind IP，本机＋内网就可满足绝大数服务
3. 修改默认端口
4. 开启 auth 验证
