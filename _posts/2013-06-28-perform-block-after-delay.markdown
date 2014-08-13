---
layout: post
title: "Perform block after delay"
date: 2013-06-28 09:31
categories: [Dev]
---

```objc
dispatch_after(dispatch_time(DISPATCH_TIME_NOW, delay * NSEC_PER_SEC), dispatch_get_current_queue(), block);
```

可以封装一个 NSObject Category 来方便使用。 via [Tutorial: Run a Block of Code After a Delay](http://www.brianjcoleman.com/tutorial-run-a-block-of-code-after-a-delay/)

