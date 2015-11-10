---
layout: post
title: ngx_lua vs Go
date: 2015-11-07 21:19:50 +0800
---

> 由于移动互联网的火爆，前后端分离的开发模式越来越流行：后端通过 API 提供数据，前端 native or web 做数据展示交互。那么谁能把吐数据这件事做的又快又好，谁就比较适合做服务端应用开发。

[2011年][1]我们开始用 OpenResty(ngx_lua) 作为服务端应用解决方案，最近一个项目换用 Go，简单做个对比：

ngx_lua:

1. 快，和 nginx 简直绝配，尤其是分执行阶段进行操作
1. 同步方式写异步非阻塞，相比 Node.js 回调，代码体验好
1. 但还不够好，欠缺在开发效率，社区丰富程度，我们这些使用者也有责任
1. Lua 语言非常棒，简单高效，但相较于其他语言这些年进步太慢
1. LuaJIT 让性能爆表，但只兼容到 Lua 5.1，见过很多因为用错版本而引发错误。原开发者不再继续维护，转有 CloudFlare 接手，后续有一定不确定性 [via][2]
1. nginScript 现在和 ngx_lua 完全没有可比性，未来很难说，毕竟有官方支持，加上 js 一统江湖的趋势

Go:

1. 静态语言
1. 学院派看 Go 语言的设计有很多缺陷，但从工程的角度，简单，规范，标准库丰富
1. 开发效率高，自测性能在 ngx_lua 70% 左右，大多数情况下完全够用
1. goroutine + channel，同步方式写异步
1. 方便的工具链，go fmt/doc/test/pprof
1. 跨平台编译，单二进制文件，部署方便
1. 虽然有 `go get`，但一开始没有原生包管理是很大的失败，现在社区已经分裂出 godep/govender/nut/gb/glide/gopkg.in 等等

[1]:https://github.com/appwilldev/moochine
[2]:http://www.freelists.org/post/luajit/Looking-for-new-LuaJIT-maintainers
