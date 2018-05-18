---
layout: post
title: "iOS 7 Background Fetch"
date: 2014-02-25 21:27
categories: [Dev]
---

iOS 7 新加了三个后台任务 API: `Background Fetch` 后台获取，`Silent Remote Notifications` 静默推送，`￼Background Transfer Service` 后台传输。

Background Fetch 会由系统进行调度，应用可以在后台进行一定的网络请求。这里的限制是后台操作只允许 30s，超时未完成应用会被直接 kill，所以只适合做一些简单的网络请求。

Silent Remote Notifications 可以由服务端控制，通过消息后台打开应用根据消息内容 (content-id) 进行一些操作，也可以做网络请求，但同样只有 30s 限制。

Background Transfer Services 可以在后台进行网络大文件的下载、上传操作，没有时间限制，但只能在 Wi-Fi 下进行，而且受系统调度可能会是间断性进行。一般可以配合静默推送一起用，比如电视剧更新，静默推送最新一集信息到手机，应用后台新建下载任务然后逐步下载，下载完成后再通过 Local Notifications 通知用户观看。

Background Fetch 使用步骤：

1 在 `Target - Capabilities` 打开 `Background Modes`，勾选 `Background Fetch`。也可以手动修改 Info.plist 添加 `UIBackgroundModes - fetch`。

2 设置后台获取时间间隔:

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [application setMinimumBackgroundFetchInterval:UIApplicationBackgroundFetchIntervalMinimum];

    return YES;
}
```

3 执行后台获取，并在完成后通知系统:

```objc
- (void)application:(UIApplication *)application performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
    //...
    [fetcher fetchDataWithResult:^(NSError *error, NSData *data){
        if (error) {
            completionHandler(UIBackgroundFetchResultFailed);
        } else {
            // parse data
            if (hasNewData) {
                completionHandler(UIBackgroundFetchResultNewData);
            } else {
                completionHandler(UIBackgroundFetchResultNoData);
            }
        }
    }];
}
```

需要注意的是一定要在请求完成后再调用 `completionHandler();`，不然请求有可能被系统中断。可以配合 [NSOperation + KVO][1] 在所有操作都完成后再执行 `completionHandler();`.

Xcode 5 提供了两个方法测试 Background Fetch，一是模拟器运行应用时通过 Xcode 菜单 `Debug - Simulate Background Fetch` 模拟；二是修改应用 Scheme 选中 `Launch due to a background fetch event` 再运行应用，这时候应用不会打开界面，真正的在后台运行。

参考 [Multitasking in iOS 7][2], [WWDC 2013 Session笔记 - iOS7中的多任务][3], [iOS 7: Background Fetch][4].

[1]:https://fann.im/blog/2014/02/23/nsoperation/
[2]:http://www.objc.io/issue-5/multitasking.html
[3]:http://onevcat.com/2013/08/ios7-background-multitask/
[4]:http://www.doubleencore.com/2013/09/ios-7-background-fetch/

