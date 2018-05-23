---
layout: post
title: "UISegmentedControl error on iOS 4.x"
date: 2012-07-18 21:35
---

Code 1:

```objc
self.segmentedControl = [[[UISegmentedControl alloc] init] autorelease];
[_segmentedControl setSelectedSegmentIndex:0];
[_segmentedControl addTarget:self
                      action:@selector(segmentedControlSwitch)
            forControlEvents:UIControlEventValueChanged];
```

Code 2:

```objc
self.segmentedControl = [[[UISegmentedControl alloc] init] autorelease];
[_segmentedControl addTarget:self
                      action:@selector(segmentedControlSwitch)
            forControlEvents:UIControlEventValueChanged];
[_segmentedControl setSelectedSegmentIndex:0];
```

注意 `[_segmentedControl setSelectedSegmentIndex:0];` 的位置，在 iOS 4.x 下，Code 2 代码在设置 `selectedSegmentIndex` 的时候会执行一次 `segmentedControlSwitch` 方法。在 iOS 5+ 没有这个问题。

