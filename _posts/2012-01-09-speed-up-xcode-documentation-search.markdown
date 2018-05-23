---
layout: post
title: "加速 Xcode 文档搜索"
date: 2012-01-09 11:27
---

Xcode 的文档搜索速度实在是不给力，因为 Xcode 是实时的索引所有 Doc Sets 来查找。解决方法：

1. 更换 SSD，一劳永逸，更能带来编译速度的极大提升。
1. 第三方文档搜索工具，比如 Ingredients、AppKiDo，缺点是没法和 Xcode 完美结合，比如 Option+Click 快速查找。
1. 修改 Find Options 来减少一些索引，只做 iOS 就没必要选 Mac 的 Doc Sets. 另外 Match Type 选 **Prefix** 也会快很多。可以参考下面这个 Find Options 设置。

![](http://ww4.sinaimg.cn/mw600/92bf69fbgw1dow1d4wrymj.jpg)

感谢 @[jjgod](http://www.v2ex.com/t/22088#reply16) 分享的小技巧。
