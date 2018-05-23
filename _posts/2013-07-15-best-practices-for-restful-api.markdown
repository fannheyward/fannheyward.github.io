---
layout: post
title: "Best Practices for RESTful API"
date: 2013-07-15 21:52
---

做服务端开发，免不了有对外接口，正好看到 [Best Practices for Designing a Pragmatic RESTful API][1]，简单摘抄做个笔记。

1. API 就是面对开发者的 UI，所以要对开发者友好，能方便在浏览器输入访问。
1. 尽量遵守 Web 标准。
1. 使用 RESTful URLs。URL 标识资源，HTTP Method(GET/POST/PUT/DELETE) 操作控制资源，其中 GET 获取，POST 新建，PUT 更新，DELETE 删除，还有一个 PATCH 部分更新。
1. URL 用复数形式标识资源。
1. URL 资源作为一个原子操作。
1. 文档，并且配上相应示例，最好提供可直接浏览器+curl 的例子。
1. API 一旦确定就不轻易修改，更新和删除要有对应文档说明。
1. API 要有版本，并且直接在 URL 中表现出来，比如 `/api/1/xyz`.
1. URL 可以跟上条件过滤控制参数，比如 `/tickets?state=open`。
1. 把常用的条件集合包装成一个 URL 资源，比如 `/tickets/recently_closed`。
1. URL 可包含一个返回字段列表，只返回指定字段内容，比如 `/tickets?fields=id,subject`
1. 只有 JSON 格式，然后也就没有必要在 URL 指明 format 后缀。
1. URL 采用蛇形命名(下划线形式)，比如 `user_timeline`.
1. API 返回要设置 Content-Type，结果用 Gzip 压缩。
1. RESTful GET 只能读取，不允许修改数据。
1. API 请求有次数限制，类似 [Twitter Rate Limiting][2]
1. 如有需要，用 OAuth 2 认证。
1. API 头部信息包含 ETag 等缓存信息。
1. 有用的错误信息：唯一错误码+错误描述信息，有对应文档。
1. 充分利用 HTTP status code，比如 200/201/204/304/401/403/404/405.

[1]:http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
[2]:https://dev.twitter.com/docs/rate-limiting/1.1

