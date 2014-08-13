---
layout: post
title: "Grand Central Dispatch Sample"
date: 2012-03-04 22:26
categories: [Dev]
---

说来惭愧，做 iDev 一年多了，最近才第一次在正式项目中使用 GCD。做个笔记。

Grand Central Dispatch(GCD) 是苹果 iOS 4 推出的任务调度机制，把不同的任务分配给不同的 queue 来处理，非常适合异步任务，支持多核处理器，比 performSelectorInBackground 这种线程调度有更好的处理性能，而且配合 Blocks 使用非常方便。

```objc
dispatch_queue_t bgQueue = dispatch_queue_create("im.fann.bgQueue", NULL);
// or dispatch_queue_t bgQueue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
// or dispatch_queue_t bgQueue = dispatch_get_global_queue(0, 0,); for short

dispatch_async(bgQueue, ^{

    ...// load data from server

    dispatch_async(dispatch_get_main_queue, ^{
        // dispatch_get_main_queue get back to the main queue to update UI. You can only change UI in main queue.
        [rootTableView reloadData];
    });
});
```

非常棒的 GCD 系列教程：

- [Intro to Grand Central Dispatch, Part I: Basics and Dispatch Queues][1]
- [Intro to Grand Central Dispatch, Part II: Multi-Core Performance][2]
- [Intro to Grand Central Dispatch, Part III: Dispatch Sources][3]
- [Intro to Grand Central Dispatch, Part IV: Odds and Ends][4]

[1]:http://www.mikeash.com/pyblog/friday-qa-2009-08-28-intro-to-grand-central-dispatch-part-i-basics-and-dispatch-queues.html
[2]:http://www.mikeash.com/pyblog/friday-qa-2009-09-04-intro-to-grand-central-dispatch-part-ii-multi-core-performance.html
[3]:http://www.mikeash.com/pyblog/friday-qa-2009-09-11-intro-to-grand-central-dispatch-part-iii-dispatch-sources.html
[4]:http://www.mikeash.com/pyblog/friday-qa-2009-09-18-intro-to-grand-central-dispatch-part-iv-odds-and-ends.html

