---
layout: post
title: "OS X 下用 IPFW 作端口转发"
date: 2013-01-22 23:51
categories: [Share]
---

用 ipfw 监听本地 80 端口然后转发到 8080 等端口，方便本地开发时调试操作。ipfw 是 OS X 自带的防火墙程序，类似 Linux 下的 iptables。

1. 查看当前 ipfw 规则:

> sudo ipfw show

1. port 80 to 8080 forward：

> sudo ipfw add 100 fwd 127.0.0.1,8080 tcp from any to any 80 in

1. 清除 ipfw 规则

> sudo ipfw flush

Done.

via [Port Forwarding (80 to 8080 for Tomcat) Using IPFW on Mac OSX](http://obscuredclarity.blogspot.jp/2011/05/port-forwarding-80-to-8080-for-tomcat.html)

