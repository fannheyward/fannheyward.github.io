---
layout: post
title: "多 UIScrollView 下点击状态栏回到顶部"
date: 2013-09-05 11:08
---

iOS 下 UITableView/UIScrollView 有个特性：点击状态栏回到顶部。如果当前 view 下有多个 scrollView，或者多个 tableView 嵌套，点击回到顶部就无效，因为系统不知道该响应哪个，索性就全部禁用。文档：

> On iPhone, we execute this gesture only if there's one on-screen scroll view with `scrollsToTop` == YES. If more than one is found, none will be scrolled.

找到了原因解决也就很简单：只保留需要点击回到顶部 scrollView.scrollsToTop = YES，其他全部禁用。

就这么简单的 tip 我也是最近才知道，而解决办法就在官方文档里，so [RTFM](http://en.wikipedia.org/wiki/RTFM) first.

