---
layout: post
title: "通过 Xcode 启动参数测试 App 本地化"
date: 2013-07-23 18:07
categories: [Dev]
---

以往测试 App 本地化就是通过切换系统语言来做，甚是麻烦，其实可以用 Xcode 启动参数强制 App 用指定语言：

```
-AppleLanguages (en)
```

* `-` 开头，Applelanguages 后有一空格，语言放在括号内。
* 语言可以用全名或简写均可，比如 English == en，不区分大小写。
* 必须通过 Xcode 启动才有效，模拟器和真机设备都支持。

添加参数方法: `Product` > `Scheme` > `Edit Scheme` (or ⌘<), Arguments Passed On Launch 下添加。可以添加多个方便切换:

![launch arguments to test localizations](https://lh4.googleusercontent.com/-5_NGJv0P2VI/Ue5fQ9P6_DI/AAAAAAAAEdU/OnoEMRb3KnU/d/launch-arguments.png)

via [Using Launch Arguments to Test Localizations](http://useyourloaf.com/blog/2013/07/22/using-launch-arguments-to-test-localizations.html)

