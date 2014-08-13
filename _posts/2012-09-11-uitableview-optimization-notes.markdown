---
layout: post
title: "UITableView 性能优化笔记"
date: 2012-09-11 11:48
categories: [Dev]
---

Hacking Week 技术总结最后一篇，记一下 UITableView 性能优化需要注意和改进的地方。

1. 网络图片异步加载，SDWebImage。
1. 文字直接 drawInRect/drawAtPoint 绘制，参考 ABTableViewCell，[AdvancedTableViewCells][1]。
1. 本地图片也可以直接绘制，或者用 CALayer 来添加显示。
1. cell 重用机制。
1. cell 内容尽量避免透明效果。
1. 如非必要，减少 reloadData 全部 cell，只 reloadRowsAtIndexPaths。
1. 如果 cell 是动态行高，计算出高度后缓存。tableView 会在加载的时候把全部 cell 的高度通过 `heightForRowAtIndexPath:` 都计算出来，即使 cell 还没有展示。
1. 如果 cell content 的展示位置也不固定，第一次计算后也要缓存。
1. cell 高度固定的话直接用 `cell.rowHeight` 设置高度，不要再实现 `tableView:heightForRowAtIndexPath:` delegate.
1. cell content 的解析操作（尤其是复杂的解析）异步进行＋预执行，解析结果要缓存。
1. 可以预先加载需要的网络资源（图片等），SDWebImagePrefetcher.

> There are performance implications to using `tableView:heightForRowAtIndexPath:` instead of the `rowHeight` property. Every time a table view is displayed, it calls `tableView:heightForRowAtIndexPath:` on the delegate for each of its rows, which can result in a significant performance problem with table views having a large number of rows (approximately 1000 or more). via [Apple Document][2]

[1]:https://developer.apple.com/library/ios/#samplecode/AdvancedTableViewCells/Introduction/Intro.html
[2]:https://developer.apple.com/library/ios/documentation/UIKit/Reference/UITableViewDelegate_Protocol/Reference/Reference.html#//apple_ref/doc/uid/TP40006942-CH3-SW25

