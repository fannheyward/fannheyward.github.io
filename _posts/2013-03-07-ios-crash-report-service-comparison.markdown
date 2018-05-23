---
layout: post
title: "iOS Crash Report Service Comparison"
date: 2013-03-07 23:19
---

实验对比一下现有的 iOS Crash report 服务。包括 [Google Analytics(GA)][1], [Crashlytics][2], [TestFlight][3], [HockeyApp][4]/[QuincyKit][5]/[HockeyKit][6], [Crittercism][7], [Bugsense][8], [Flurry][9].

Google Analytics
----

1. 手动或 CocoaPods 添加库，设置统计 ID，开启 trackUncaughtException，使用很简单。
1. Crash 报表比较简陋，可以根据应用版本号、iOS 版本区分，然后根据 crash description 分类，堆栈描述信息比较少，只有 crash 部分栈信息。
1. 通过 try-catch 可以有目的性的对 NSException、NSerror 进行捕捉。
1. GA 2.0 仍在 beta，稳定性需要验证 。
1. 免费。

**GA 集成，可以少添加一个库，类似统计的方式做 crash report，crash 信息比较简单，适合简单使用。**

Crashlytics
----

1. 相较其他库手动添加或者用 CocoaPods 方式引入，Crashlytics 需要一个软件来集成，刚开始会比较不习惯。按流程走，选中项目，添加 Build Phase-Run Script，添加 framework，设置 APIKey，Done。
1. 堆栈信息完善，crash 自动分类，然后作为一个 issue 列出，可以列出 crash 设备信息 (JailBroken, free space, free RAM，屏幕旋转方位，network type 等)，这些信息对于 crash 筛选和原因查找会有很大帮助。
1. issue 有 open/close 两个状态，方便解决统计。
1. 支持 developer team。
1. 被动收集，没有主动收集方式。
1. crash 邮件报告，支持 Redmine 等第三方服务集成，方便 bug 提交管理。
1. 被 Twitter 收购后[企业版改为免费][10]。

**Crash 信息完善，分类清晰，适合对 crash report 要求比较高的场景使用。**

TestFlight
----

1. 手动或 pod 添加，打包上传到 TestFlight，获取 token。使用逻辑比较混乱，先上传 app 才能拿到 token。
1. 支持应用分发，feedback，remote logs，Sessions，Checkpoint 等统计功能。
1. 单纯 crash 的话使用还比较简单，不需要做特殊处理，其他功能需要针对处理。
1. crash 发送好像有点问题，crash 了几次后服务器都没有收到，所以也没法看到 crash 统计。
1. 支持 developer team。
1. 免费。

**看起来功能很多，但是都不够深度，crash report 功能不堪大用。**

HockeyApp/QuincyKit/HockeyKit
----

1. pod 添加 SDK，打包上传，获取 token；手动添加流程看起来非常麻烦。
1. crash 自动分类，栈信息完整，会把关键信息提炼出来。crash status-Open/Resolved/Ignored。
1. 支持应用分发、feedback。
1. 支持和第三方 bug tracker 集成。
1. HockeyKit、QuincyKit 是开源版本的 HockeyApp，均有客户端和服务端代码，QuincyKit 只有 crash report，HockeyKit 只有应用分发和更新。
1. 手动上传 dSYM。
1. HockeyApp 收费，免费试用一个月。

**简单说就是 TestFlight 加强版，应用分发 + crash report.**


Crittercism
----

1. 使用简单，先在网站注册一个应用，获取 token，不需要上传 ipa 到网站。
1. 按 crash 原因归类，堆栈信息完整，高亮标明主要信息。crash 报表清晰，可以很明确的查看 crash 历史，设备信息（RAM，iOS version，device，network 等）。
1. 支持主动有目的性 exception 收集。
1. 支持 crash status（unresolved，resolved，known）。
1. 需要手动上传 dSYM，估计是为了 release 下使用。
1. 支持 crash alarm，SMS、邮件接收，支持 Uservoice 服务集成。
1. 支持 developer team。
1. 居然还有一个 rate app alert 功能。。。
1. 有免费套餐，专业版支持简单的应用统计。专业版每月活跃用户 100K (per 100k MAU)，限制比较大。
1. 初创公司，获得风投，和 Crashlytics 气质最像的一个。

**功能强大的专业的 crash report 服务。**

Bugsense
----

1. 网站注册应用，获取 token。
1. 客户端是用 PlCrashReporter 做 crash 收集。
1. crash report 可以按 status/App version/OS version 过滤 (付费版)。
1. 发送 crash report 的时候可以附带一些自定义数据。
1. 有一个比较神奇的功能，Fix Notification，如果某个 crash 已经标记为 resolved 并且新版本已经上线，可以弹窗提醒用户该 crash 已经解决，引导用户去更新升级 （付费版）。
1. crash 收集服务被墙。 There are cases where our servers are being blocked due to geographic restrictions (e.g. China).
1. 应用应用使用统计，支持 Event 统计
1. 免费版限制太多，基本不可用。

**相对来说功能比较简单的 crash report 服务。**

Flurry
----

1. 网站注册应用，获取 application key。
1. 做统计出身，所以 crash report 功能只能算是一个附属功能，crash log 非常简单。
1. 免费。

**统计服务附带 crash report，功能简单。**

小结
----

1. crash report 要求不高且在用 GA/Flurry 统计的话，直接用附带的。
1. 需要更为专业详细的 crash report，Crashlytics/Crittercism 二选一。
1. 需要应用分发的话上 HockeyApp。

----

个人倾向于 Crashlytics。原因：

1. 内部测试应用分发都比较简单，可以用脚本+内部服务器搞定，比如这个 [build.py][11]。
1. Crittercism 有 MAU 限制，付费升级到 Premium 也限制 100K MAU。
1. Twitter 收了 Crashlytics 后很大方的把企业版免费，开发也在继续。
1. Crashlytics 的网站设计更喜欢一些。


[1]:https://developers.google.com/analytics/devguides/collection/ios/v2/
[2]:https://crashlytics.com
[3]:https://testflightapp.com
[4]:http://hockeyapp.net/
[5]:http://quincykit.net/
[6]:http://hockeykit.net/
[7]:https://www.crittercism.com
[8]:http://bugsense.com/
[9]:http://www.flurry.com/flurry-crash-analytics.html
[10]:http://www.crashlytics.com/blog/crashlytics-enterprise-is-now-free/
[11]:https://gist.github.com/fannheyward/4159383

