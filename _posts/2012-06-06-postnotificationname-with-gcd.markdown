---
layout: post
title: "postNotificationName with GCD"
date: 2012-06-06 18:23
categories: [Dev]
---

用 GCD 在后台线程进行下载任务，下载完成后通过 `NSNotificationCenter` post 一个消息出来，这时候要注意 `postNotificationName:` 必须要回到主线程进行，不然会引发 crash.

```objc
dispatch_async(dispatch_get_main_queue(), ^{
    [[NSNotificationCenter defaultCenter] postNotificationName:AnyNotification
                                                        object:nil];
});
```

