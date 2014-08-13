---
layout: post
title: "[MFMailComposeViewController canSendMail] issue"
date: 2011-12-27 11:33
categories: [Dev]
---

发现 `MFMailComposeViewController` 一个挺奇怪的问题，代码一：

```
if ([MFMailComposeViewController canSendMail]) {
    MFMailComposeViewController *mailComposer = [[MFMailComposeViewController alloc] init];
    [mailComposer setSubject:@"Mail"];
    //...
    [self presentModalViewController:mailComposer animated:YES];
    [mailComposer release];
}
```

如果设备没有设置 Mail，那么该操作不会有任何反应。不会有弹窗出现。

代码二：

```
MFMailComposeViewController *mailComposer = [[MFMailComposeViewController alloc] init];
if (![MFMailComposeViewController canSendMail]) {
    return;
}
//...
```

代码二这种情况下如果没有设置 Mail，会有系统弹窗提示 “无邮件账户”。

