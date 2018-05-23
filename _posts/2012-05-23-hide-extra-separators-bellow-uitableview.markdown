---
layout: post
title: "隐藏 UITableView 下不需要的分割线"
date: 2012-05-23 19:03
---

`UITableViewStylePlain` 样式下的 UITableView 如果显示分割线，就会在 tableView 下显示额外的空白 cell 和分割线。在 SO 上发现一个小技巧来解决这个问题 [Eliminate Extra separators below UITableView - in iphone sdk?][1]

```
UIView *v = [[UIView alloc] initWithFrame:CGRectMake(0, 0, self.tableView.width, 1)];
v.backgroundColor = [UIColor whiteColor];
[self.tableView setTableFooterView:v];
```

[1]:http://stackoverflow.com/a/1789714/380774
