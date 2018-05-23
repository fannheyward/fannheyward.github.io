---
layout: post
title: "UITaleView 多选"
date: 2012-07-13 10:13
---

效果就是 cell.contentView 右移，左侧留一空圆，点击选中，再点取消选中。

`[_rootTable setEditing:YES animated:YES];` 进入多选，然后实现 delegate：

```objc
- (UITableViewCellEditingStyle)tableView:(UITableView *)tableView editingStyleForRowAtIndexPath:(NSIndexPath *)indexPath
{
	// 关键所在
    return UITableViewCellEditingStyleDelete | UITableViewCellEditingStyleInsert;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (tableView.editing) {
        if (_dataArray && [_dataArray count]>indexPath.row) {
            NSDictionary *dict = [_dataArray objectAtIndex:indexPath.row];
            [_pickedArray addObject:dict];
        }
    }
}

- (void)tableView:(UITableView *)tableView didDeselectRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (tableView.editing) {
        if (_dataArray && [_dataArray count]>indexPath.row) {
            NSDictionary *dict = [_dataArray objectAtIndex:indexPath.row];
            [_pickedArray removeObject:dict];
        }
    }
}
```

