---
layout: post
title: "iOS 6 下自动旋转的变化"
date: 2012-10-22 22:12
---

iOS 6 SDK 中的屏幕自动旋转有了一些变化，简单纪录之。举例：Master-Detail 类型 App，master ViewController 不支持屏幕旋转， detail ViewController 支持屏幕旋转。

在 Info.plist 或 Target-Summary 启用自动旋转，选中需要的 Supported Interface Orientations。新建 UINavigationController+Autorotation.h category，根据需要禁用最底层 NavController 的自动旋转：

```
- (BOOL)shouldAutorotate
{
    return NO;
}
```

在 AppDelegate 设置 `window.rootViewController = navController;`，由于 `shouldAutorotateToInterfaceOrientation:` 从 iOS 6 起 deprecated，在需要自动旋转的 viewController 改用 `supportedInterfaceOrientations`+`preferredInterfaceOrientationForPresentation`。

```
- (BOOL)shouldAutorotate
{
    return YES;
}

- (NSUInteger)supportedInterfaceOrientations
{
    return UIInterfaceOrientationMaskAllButUpsideDown;
}

- (UIInterfaceOrientation)preferredInterfaceOrientationForPresentation
{
    return UIInterfaceOrientationLandscapeRight;
}
```

几个需要注意的地方：

1. window 需要设置 rootViewController，`[window addSubview:navController.view];` 无效；
2. `shouldAutorotate` 在最底层设置才有效；
3. `presentModalViewController` 下用之前的自动旋转控制无效，须用 category 解决。

