---
layout: post
title: "iOS Background Task Notes"
date: 2012-08-01 15:49
---

iOS 4+ 支持 audio、location、voip 后台常驻任务，除此以外 App 还可以向系统申请额外一段时间（十分钟）在后台执行某些任务，比如进入后台后发送操作日志等。

注册消息通知，或者直接实现 `- (applicationDidEnterBackground:(UIApplication *)application` delegate。

```objc
[[NSNotificationCenter defaultCenter] addObserver:self
                                         selector:@selector(appDidEnterBackground)
                                             name:UIApplicationDidEnterBackgroundNotification
                                           object:nil];
```

向系统申请 background task 并执行：

```objc
- (void)appDidEnterBackground
{
    if (![UIDevice currentDevice].multitaskingSupported) {
        return;
    }

    UIApplication *app = [UIApplication sharedApplication];
    __block UIBackgroundTaskIdentifier bgTask = [app beginBackgroundTaskWithExpirationHandler:^{
        dispatch_async(dispatch_get_main_queue(), ^{
            if (bgTask != UIBackgroundTaskInvalid) {
                [app endBackgroundTask:bgTask];
                bgTask = UIBackgroundTaskInvalid;
            }
        });
    }];

    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        //Do tasks you want.

        dispatch_async(dispatch_get_main_queue(), ^{
            if (bgTask != UIBackgroundTaskInvalid) {
                [app endBackgroundTask:bgTask];
                bgTask = UIBackgroundTaskInvalid;
            }
        });
    });
}
```

注意：`beginBackgroundTaskWithExpirationHandler:` 生成的 task 在执行完以后必须要用 `endBackgroundTask:` 告诉系统任务已结束，不然在申请时间用完以后 App 会被系统直接终止，而不是挂起（suspended）。

