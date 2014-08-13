---
layout: post
title: "What I have learned from Cheddar for iOS"
date: 2012-08-12 12:07
categories: [Dev]
---

1. Code Style.
1. DRY，整理适合自己的代码库(SSToolkit)。
1. `application:didFinishLaunchingWithOptions:` 里尽量少操作，减少 launch 时间。只做界面展示工作，数据层用 dispatch_async 异步操作。
1. 多用 `[image stretchableImageWithLeftCapWidth:5 topCapHeight:0]` 图片拉伸，减小 App size。效果上并没有缺失很多。很多效果都可以用代码实现，不一定非得贴图。
1. 数据层封装不同的对象，方便各种调用。直接用 dict 传来传去不够清晰。
1. Core Data 和 UIViewController 可以很好的结合，深度封装后的确很方便，参见 SSManagedViewController ＝ UIViewController＋SSManagedObject(NSManagedObject)，SSDataKit。但这样感觉 ViewController 很沉重，也可能是因为我对 Core Data 不熟悉，以后有机会加深一下 CD 的学习使用。
1. KVO 是个好东西。
1. 定义一些内部 scheme 来做界面跳转，`x-cheddar-tag`.
1. `UIColor+CheddariOSAdditions.h`-`cheddarTextColor`，定义整体风格配色，很方便使用。`UIFont+CheddariOSAdditions.h` 同理。
1. `cellHeightForText:` 用 `dispatch_once_t` 生成一个单例 label，然后 `sizeThatFits:` 计算。
1. `prepareForReuse` 释放数据。
1. `CDKHTTPClient` 学习 AFN 的好例子。单实例，用 block 封装接口。Block is better than delegate, simple, clear and powerful.

