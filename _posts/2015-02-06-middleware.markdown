---
layout: post
title: Middleware
date: 2015-02-06 00:16:48 +0800
---

**(这块内容属于个人理解，可能会不对)**

最近学习中又一次接触 middleware 概念，一直对这个东西都比较模糊，似乎 Ruby 界用的比较多，比如 [Rack][3]。middleware 给我的感觉就是在请求与 App 之间对请求进行一层或多层处理，然后将处理后的请求对象交由 App；同理，在 App 和响应之间也可以有。

一个常见的业务场景：

`请求 -> [cache.get -> 有－返回｜无 -> 服务处理生成数据 ->  cache.set] -> 响应`

其中 cache 读写都是在服务内处理请求时进行。套用 middleware 似乎是这样的流程：

`请求 -> [middleware.cache.get -> 有－返回|无－请求交由下一步处理] -> [服务处理生成数据] -> [middleware.cache.set] -> 响应`

去掉 middleware.cache 整个服务不受影响，流程变成了这样:

`请求 -> [服务处理生成数据] -> 响应`

middleware 的好处是可多层组合，让流程有层次，服务更专一。接下来要在实际项目中实践一下:

* [Negroni][1], Idiomatic HTTP Middleware for Golang.
Martini 作者开发。
* [lua-resty-rack][2], A minimalistic rack implementation for Openresty.

[1]:http://codegangsta.io/blog/2014/05/19/my-thoughts-on-martini/
[2]:https://github.com/APItools/lua-resty-rack
[3]:https://github.com/rack/rack/wiki/List-of-Middleware
