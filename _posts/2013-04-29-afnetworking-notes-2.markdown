---
layout: post
title: "AFNetworking 学习笔记二"
date: 2013-04-29 21:02
categories: [Dev]
---

[AFNetworking 学习笔记][1] 的后续，记录一些 AFN 比较隐蔽的知识点。

### AFN 的设计过于理想化

AFN 的架构设计非常棒，使用起来也很简单，但一些设计过于理想化，在实际开发中会有一些条件不能满足，这时候 AFN 就会出现一些“坑”。

#### 1. 缓存策略

NSURLRequest 默认的缓存策略是 `NSURLRequestUseProtocolCachePolicy`，网络请求是否用缓存是由 HTTP Cache-Control 决定，而在实际开发中由于种种原因(服务端为了简化系统等)，接口的缓存时间都设置的非常长或者不准，这种情况下就会出现服务端数据更新但是 AFN 拿到的还是旧数据，因为他直接读的缓存。

得益于 AFN 优秀的架构设计，这个问题也很好解决，继承 AFHTTPClient 然后重写 `requestWithMethod:path:parameters:`:

``` objc
- (NSMutableURLRequest *)requestWithMethod:(NSString *)method path:(NSString *)path parameters:(NSDictionary *)parameters
{
    NSMutableURLRequest *request = [super requestWithMethod:method path:path parameters:parameters];
    [request setCachePolicy:NSURLRequestReloadIgnoringLocalCacheData];

    return request;
}
```

#### 2. Response 类型判断

以 AFJSONRequestOperation 为例，只有 Content-Type 是 `@"application/json", @"text/json", @"text/javascript"` 或 URL pathExtension 是 json 的才会被认为是 JSON 类型，其他都不认。很多服务端接口都没有 Content-Type 返回或者直接丢一个 `text/html`，请求也不是 json 结尾，但返回内容确实又是 JSON 数据，这时候 AFN 就很无力。

----

上面这两个问题的根本原因是服务端由于各种各样的问题不能严格按照 HTTP 要求返回正确格式的内容，造成 AFN 无法按照标准去接收解析。责任虽不在客户端开发，但实际开发中确实存在这种情况，这个时候就需要客户端去迂回解决，好在 AFN 的架构设计很容易扩展。

### AFN vs ASI

AFN 已经取代 ASIHTTPRequest(ASI) 成为 iOS 开发中首选的网络库，但不能说 AFN 就完胜 ASI，比如这篇 [对比iOS网络组件：AFNetworking VS ASIHTTPRequest][2]，AFN 在易用性上胜出，在性能上并没有 ASI 好(因为 ASI 是直接用 CFNetwork 底层而 AFN 是用 NSURLConnection)。

就我自己实际开发来说，AFN 最大的不便是没有 **synchronous** 请求方式，只支持异步请求。很多时候我们只是想发一个请求，无需返回处理，这种情况下 AFN 这种自定义 HTTPClient 的方式就过于复杂。

最近发现了一个网络库 [STHTTPRequest][3]，基于 NSURLConnection，支持 synchronous+asynchronous blocks，支持文件上传，非常简单轻量的封装，值得一试。

[1]:http://fann.im/blog/2012/08/21/afnetworking-notes/
[2]:http://www.jiajun.org/2013/03/16/afnetworking_vs_asihttprequest.html
[3]:https://github.com/nst/STHTTPRequest

