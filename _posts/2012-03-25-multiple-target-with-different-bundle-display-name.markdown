---
layout: post
title: "多 Target 下不同的 Bundle Display Name"
date: 2012-03-25 15:32
---

真不好用一个标题来概括这个东西。Xcode 4.2+ 在项目多语言包 `xx.lproj` 里引入了一个叫 `InfoPlist.strings` 的文件，可以对同一个 App 在不同系统语言下显示不同的 Display Name。比如：

```
InfoPlist.strings (English) - "CFBundleDisplayName" = "English Name";
InfoPlist.strings (Chinese) - "CFBundleDisplayName" = "中文";
```

在单 Target 下很容易做，多 Target 的时候就需要做一点额外的处理。在项目目录下新建与 Target 同名的文件夹（同名是为了方便区分），然后将 `xx.lproj` 文件夹 **复制** 到各个 Target 下面，目录结构会是这个样子：

```
./Target1/
          en.lproj/InfoPlist.strings
          zh-Hans.lproj/InfoPlist.strings
./Target2/
          en.lproj/InfoPlist.strings
          zh-Hans.lproj/InfoPlist.strings
```

复制后保持项目目录下还有 `xx.lproj` 文件夹，里面保留 `Localizable.strings`，因为多语言化一般是通用的，没必要针对每一个 Target 做多语言。复制后的 `Target1/xx.lproj` 下只有 `InfoPlist.strings`。然后添加到 Xcode 项目里，打开 Xcode - Views - Utilities （Command+Option+0），在 `Target Membership` 下针对不同的 Target 把对应文件夹下的 `InfoPlist.strings` 对应连接起来，Done。

