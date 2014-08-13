---
layout: post
title: "CoreFoundation 和 NSObject 在 ARC 下的转换"
date: 2013-12-25 09:00
categories: [Dev]
---

CoreFoundation 有自己的引用计数处理方法，在 CF 下如果生成对象的方法中有 create、retain、copy 就表示 CF 会用自己的方式对引用计数加一，这就需要在结束的时候用 `CFRelease()` 释放。而 ARC 目前只对 NSObject 对象有自动的引用计数处理，所以在 ARC 如果有 CoreFoundation 对象和 NSObject 对象转换就需要用 `__bridge`, `__bridge_transfer`, `__bridge_retained` 进行引用计数管理的转换。

* `__bridge` 表示 CF 对象和 NSObject 的引用计数平衡，无需转换管理权。适用于用不包含 create、retain、copy 的方法获取的 CF 对象转换为 NSObject。
* `__bridge_transfer` 表示将 CF 对象的引用计数管理员转移到 NSObject 由 ARC 管理，无需再用 `CFRelease()` 释放。
* `__bridge_retained` 表示将 NSObject 对象的引用计数管理权转移到 CF 管理，并且引用计数加一，那么在 CF 层就需要用 `CFRelease()` 释放该对象。

SDK 有两个宏 `CFBridgingRetain`, `CFBridgingRelease` 可以直接用，要注意 `CFBridgingRetain` 后要用 `CFRelease()` 释放。

``` objc
// After using a CFBridgingRetain on an NSObject, the caller must take responsibility for calling CFRelease at an appropriate time.
NS_INLINE CF_RETURNS_RETAINED CFTypeRef CFBridgingRetain(id X) {
    return (__bridge_retained CFTypeRef)X;
}

NS_INLINE id CFBridgingRelease(CFTypeRef CF_CONSUMED X) {
    return (__bridge_transfer id)X;
}
```

参考 [ARC工程转换和开发注意事项](http://www.hrchen.com/2013/07/arc-transfer-and-notice/)

