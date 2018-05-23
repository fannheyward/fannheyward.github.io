---
layout: post
title: "NSURLConnection 在页面滑动时继续执行"
date: 2013-09-20 11:04
---

这篇笔记只是为了清掉 BlogTodos，实际开发中用了 AFN 等是不会遇到这个问题。当然也可以作为原理理解。

首先是 NSRunLoop，我的理解 runloop 就是 iOS 的消息循环处理机制，响应处理各种消息事件。runloop 有不同的执行模式，不同模式下只会响应处理该模式类型的事件。App 运行时会有一个主线程 mainRunLoop，在程序中可以用 `[NSRunloop currentRunLoop]` 简单获取当前的 runloop。

NSURLConnection 在网络请求的时候(无论主线程还是子线程)，如果有点击或滑动界面，网络请求会被暂停执行，直到滑动等操作结束。这是因为 NSURLConnection 默认是 `NSDefaultRunLoopMode`，也就是说只会在该模式下执行，当有滑动、点击界面等操作的时候，runloop 会切换到 `NSEventTrackingRunLoopMode` 来处理界面操作，这时候网络请求就会被暂停执行，直到界面操作结束，runloop 模式切换回去。

解决方法就是设置 NSURLConnection 的执行模式为 `NSRunLoopCommonModes`，这样就会在所有模式下持续执行：

```objc
[connection scheduleInRunLoop:[NSRunLoop currentRunLoop] forMode:NSRunLoopCommonModes];
```

[NSRunLoop Class Reference][2]:

> NSDefaultRunLoopMode - The mode to deal with input sources other than NSConnection objects.

> NSRunLoopCommonModes - Objects added to a run loop using this value as the mode are monitored by **all run loop modes** that have been declared as a member of the set of “common" modes.

参考 [NSURLConnection: How to avoid blocked file loading during scrolling of UIScrollView or UITableView][1]

[1]:http://www.pixeldock.com/blog/how-to-avoid-blocked-downloads-during-scrolling/
[2]:https://developer.apple.com/library/ios/documentation/cocoa/reference/foundation/Classes/NSRunLoop_Class/Reference/Reference.html#//apple_ref/doc/uid/20000321-SW1
