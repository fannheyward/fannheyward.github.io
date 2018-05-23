---
layout: post
title: "NSDateFormatter 返回一年前时间"
date: 2013-03-02 13:54
---

`NSDateFormatter` 的一个小陷阱：

``` objc
NSString *ds = @"2013-03-01 23:55:56";
NSDateFormatter* formatter = [[NSDateFormatter alloc] init];
[formatter setDateFormat:@"YYYY-MM-dd HH:mm:ss"];
NSDate *date1 = [formatter dateFromString:ds];
NSLog(@"date1: %@", date1); //date1: 2012-03-01 15:55:56 +0000
[formatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
NSDate *date2 = [formatter dateFromString:ds];
NSLog(@"date2: %@", date2); //date2: 2013-03-01 15:55:56 +0000
```

格式化以后是一年前的一个时间点，`yyyy` 指代的就是常规意义上的年，而 `YYYY` 是 Week of Year, 具体解释参考 Wikipedia: [ISO_week_date][1]

iOS 开发文档有相关[提示](https://developer.apple.com/library/ios/#documentation/Cocoa/Conceptual/DataFormatting/Articles/dfDateFormatting10_4.html):

> It uses yyyy to specify the year component. A common mistake is to use YYYY. yyyy specifies the calendar year whereas YYYY specifies the year (of “Week of Year”), used in the ISO year-week calendar. In most cases, yyyy and YYYY yield the same number, however they may be different. Typically you should use the calendar year.

[1]:http://en.wikipedia.org/wiki/ISO_week_date

