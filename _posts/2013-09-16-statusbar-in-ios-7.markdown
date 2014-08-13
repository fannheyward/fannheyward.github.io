---
layout: post
title: "StatusBar in iOS 7"
date: 2013-09-16 21:44
categories: [Dev]
---

iOS 7 下状态栏默认是白底黑字，如果应用是黑色背景整个状态栏就啥也看不见。解决办法：

1. plist 设置 `UIViewControllerBasedStatusBarAppearance` NO.
1. `[[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleLightContent];`

