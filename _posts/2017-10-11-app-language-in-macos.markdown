---
layout: post
title: macOS 独立设置应用语言 
date: 2017-10-11 09:41:45 +0800
---

英文系统下让某些应用的语言是中文，可以通过 `defaults` 设置：

1. `defaults read` 查找应用的 bundle ID
2. `defaults write com.apple.Safari AppleLanguages '("zh-Hans-CN")'` 设置应用语言为中文
