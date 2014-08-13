---
layout: post
title: "Mosh - Better SSH"
date: 2013-08-16 12:42
categories: [Share]
---

[Mosh][1] 相比 SSH 的优点：

1. 网络中断、切换后自动重连。
1. 屏幕输入及时回显。

服务器需要先安装 mosh-server，开启 60000-61000 端口，本地通过 SSH 登录服务器，然后 UDP 连接服务器 mosh-server。

[1]:http://mosh.mit.edu/

