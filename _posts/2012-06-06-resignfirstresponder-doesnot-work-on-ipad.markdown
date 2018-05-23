---
layout: post
title: "resignFirstResponder doesn't work on iPad"
date: 2012-06-06 16:44
---

在 iPad 上，用 `modalPresentationStyle = UIModalPresentationFormSheet` 方式推出一个 viewController，这时这个 viewController 不会响应 `resignFirstResponder`，其他样式的 modalPresentationStyle 没有问题。苹果一个开发在开发者论坛说这是个 feature，不是 bug，[devforums.apple.com][1]

> Was your view by any chance presented with the UIModalPresentationFormSheet style?  To avoid frequent in-and-out animations, the keyboard will sometimes remain on-screen even when there is no first responder.  This is not a bug.

就算不是 bug 也很恼人，有人给出了解决方法 [devforums.apple.com][2]。新建一个 UINavigationController category，禁掉 `disablesAutomaticKeyboardDismissal`：

```objc
- (BOOL)disablesAutomaticKeyboardDismissal
{
    return NO;
}
```

然后把 viewController 挂在 UINavigationController 下即可：

```objc
MyViewController *myViewController = [[MyViewController alloc] initWithNibName:@"MyViewController" bundle:nil];
UINavigationController *navController = [[UINavigationController alloc] initWithRootViewController:myViewController];
theNavigationController.modalPresentationStyle = UIModalPresentationFormSheet;
[self presentModalViewController:theNavigationController animated:YES];
```

SO 参考:

- [resignFirstResponder Don't work?][3]
- [iPad keyboard will not dismiss if modal view controller presentation style is UIModalPresentationFormSheet][4]

[1]:https://devforums.apple.com/message/166801#166801
[2]:https://devforums.apple.com/message/425914#425914
[3]:http://stackoverflow.com/a/6854165/380774
[4]:http://stackoverflow.com/a/3386768/380774

