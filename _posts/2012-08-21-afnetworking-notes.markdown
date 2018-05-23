---
layout: post
title: "AFNetworking 学习笔记"
date: 2012-08-21 16:38
---

> 1. 这篇笔记是在 AFN v0.10.1 时候写的，AFN v1.0 以后加入了不少新东西，比如 SSL 支持，不过整体结构没有变化。
> 1. 后续跟进了一篇 [AFNetworking Notes 2][7]

![AFNetworking](https://lh3.googleusercontent.com/-KgxDNqv1-vk/UDNYRSrKBkI/AAAAAAAAC3c/QgUByH1xXEw/s640/AFN.jpg)

上图来自 @mattt 对 AFN 的介绍：[Everybody Loves AFNetworking And So Can You!][1]. 学习 AFN，简单记录一下以加深自己理解。

AFN 的基础部分是 AFURLConnectionOperation，一个 NSOperation subclass，实现了 NSURLConnection 相关的 delegate+blocks，网络部分是由 NSURLConnection 完成，然后利用 NSOperation 的 state (isReady→isExecuting→isFinished) 变化来进行网络控制。网络请求是在一个指定的线程(networkRequestThread)完成。

AFURLConnectionOperation 是一个很纯粹的网络请求 operation，可以对他进行 start/cancel/pause/resume 操作，可以获取对应的 NSURLRequest 和 NSURLResponse 数据。支持 NSInputStream/NSOutputStream，提供了 uploadPress 和 downloadProgress 以方便其他使用。

```
NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:@"http://httpbin.org/ip"]];
AFURLConnectionOperation *operation = [[AFURLConnectionOperation alloc] initWithRequest:request];
operation.completionBlock = ^ {
    NSLog(@"Complete: %@", operation.responseString);
};
[operation start];
```

插播：@mattt 在 NSHipster 里有一篇 [NSOperation][2] 详细介绍了 NSOperation 的 state、priority、dependency 等，对理解 AFURLConnectionOperation 很有帮助。

----

理解了 AFURLConnectionOperation 再看 AFHTTPRequestOperation 就简单很多。AFHTTPRequestOperation 是 AFURLConnectionOperation 的子类，针对 HTTP+HTTPS 协议做了一层封装，比如 statusCode、Content-Type 等，添加了请求成功和失败的回调 block，提供了 `addAcceptableContentTypes:` 以方便上层使用。

```
NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:@"http://httpbin.org/robots.txt"]];
AFHTTPRequestOperation *operation = [[AFHTTPRequestOperation alloc] initWithRequest:request];
[operation setCompletionBlockWithSuccess:^(AFHTTPRequestOperation *operation, id responseObject) {
    NSLog(@"Success: %@", operation.responseString);
} failure:^(AFHTTPRequestOperation *operation, NSError *error) {
    NSLog(@"Failure: %@", error);
}];
[operation start];
```

----

AFJSONRequestOperation 是 AFHTTPRequestOperation 的子类，针对 JSON 类型请求做了特殊处理，在有了 AFHTTPRequestOperation+AFURLConnectionOperation 的基础工作后，AFJSONRequestOperation 已经非常方便直接使用了。指定 `acceptableContentTypes:` 以支持 JSON，`responseJSON` 直接返回已经解析好的 JSON 数据对象。下载到 JSON 数据后在一单独线程 queue（json_request_operation_processing_queue）对 JSON 数据进行解析处理，处理完成后由主线程回调 success block。

AFN 的 JSON encode/decode 处理做的非常巧妙，现在有很多 JSON 解析库，第三方的 JSONKit、SBJSON 等，iOS 5+ 自带的 NSJSONSerialization，不同的项目可能会因为不同的需求而用不同的库，AFN 就封装了一个 AFJSONUtilities，提供 `AFJSONEncode` 和 `AFJSONDecode` 两个方法，通过 `NSClassFromString` 和 `NSSelectorFromString` 来查找项目中使用的 JSON 库然后进行 encode/decode。

```
NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:@"http://httpbin.org/get"]];
AFJSONRequestOperation *operation = [AFJSONRequestOperation JSONRequestOperationWithRequest:request
     success:^(NSURLRequest *request, NSHTTPURLResponse *response, id JSON) {
        NSLog(@"Success :%@", JSON);
     } failure:^(NSURLRequest *request, NSHTTPURLResponse *response, NSError *error, id JSON) {
        NSLog(@"Failure: %@", error);
     }];
[operation start];
```

----

AFXMLRequestOperation/AFPropertyListRequestOperation/AFImageRequestOperation 和 AFJSONRequestOperation 类似，针对 XML、Plist、image 类型请求做了一些处理。其中 AFImageRequestOperation 额外有一个 imageProcessingBlock，取到图片后可以在一个单独线程 queque 对图片进行处理，比如缩放、切圆角、图片特效等，然后再交给 main_queue success block.

AFN 还提供了一个 UIImageView+AFNetworking category，可以用 `setImageWithURL:` 来设置图片。这个 cagetory 和 SDWebImage 类似但更简单一些，图片下载由 AFN 完成，图片缓存由 NSCache 处理。

----

直接用上面这些已经可以方便的做网络请求，AFN 在这些基础上还提供了一个 AFHTTPClient，把 HTTP 请求的 Headers、User-Agent 等再次包装，方便使用。AFHTTPClient 是一个单例，对请求参数做了 URL 编码；维护一个 NSOperationQueue，不同的请求生成各自的 AFHTTPRequestOperation 然后 `enqueueHTTPRequestOperation:` 添加的队列顺序执行；`registerHTTPOperationClass:` 方法用来注册上面的 JSON/XML/Plist/image operation，拿到请求结果后交给对应的 operation 处理。AFHTTPClient 还针对 GET/POST/HEAD/PUT/DELETE 等不同的请求做了不同的 URL 参数和 Headers 处理，包括 multipart/form-data 类型。

AFHTTPClient 支持批量添加 operations，生成一个 batchedOperation，把所有 operations 作为 batchedOperation 的 dependency，再依次把所有 operations 和 batchedOperation 都添加到 operationQueue，这样每一个 operation 完成后都可以做一个 progressBlock 来返回当前已完成的 operations 数和总数，等所有 operations 都完成后会做 batchedOperation 的 completionBlock，就可以在这一批 operations 都完成后做一些善后处理。

AFHTTPClient 提倡对同一应用（同一 baseURL）的网络请求封装自己的 HTTPClient 子类，这样会方便很多。参考 [WBKHTTPClient][3].

----

AFN 还提供了很多模块，可以很方便的和 AFN 整合做一些工作，比如 OAuth，Amazon S3 等，详见 [AFNetworking-Extensions][4].

----

AFN 作者 @mattt 做东西很有自己一套思想在里面，推荐 [What I Learned From AFNetworking's GitHub Issues][5]，[视频][6]。


[1]:https://speakerdeck.com/u/mattt/p/everybody-loves-afnetworking-and-so-can-you
[2]:http://nshipster.com/nsoperation/
[3]:https://github.com/fannheyward/WeiboEngine/blob/master/WeiboKit/WBKHTTPClient.h
[4]:https://github.com/AFNetworking/AFNetworking/wiki/AFNetworking-Extensions
[5]:https://speakerdeck.com/u/mattt/p/what-i-learned-from-afnetworkings-github-issues
[6]:http://www.vimeo.com/47459338
[7]:https://fann.im/blog/2013/04/29/afnetworking-notes-2/

