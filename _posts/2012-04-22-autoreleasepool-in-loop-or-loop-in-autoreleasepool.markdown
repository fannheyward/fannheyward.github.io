---
layout: post
title: "@autoreleasepool in loop or loop in @autoreleasepool"
date: 2012-04-22 16:14
---

如果循环中会生成大量的 autorelease 对象，可以考虑用 autorelease pool 来进行封装。封装时候有两种方式：

1:

```
while ([rs next]) {
    @autoreleasepool {
        NSDictionary *dict = [self dictFromXX];
        //...
    }
}
```

2:

```
@autoreleasepool {
    while ([rs next]) {
        NSDictionary *dict = [self dictFromXX];
        //...
    }
}
```

第一种，也就是 @autoreleasepool in loop 方式下每次循环都会生成一个 pool，在单次循环结束后被 drain 掉，适用于每次循环都有大量的 autorelease 对象生成，在单次循环结束后可以及时的将资源释放。

第二种，loop in @autoreleasepool 下只有一个 pool，只会在整个循环结束后 drain 掉，也就是说第一次循环时生成的 autorelease 对象也要等到整个循环结束时候才会随着 pool 释放。适用于循环次数不太多，且每次循环只有少量的 autorelease 对象生成，毕竟这些对象都要等到循环结束后才会被释放。

ref [@autoreleasepool in loop or loop in @autoreleasepool?][1]

[1]:http://stackoverflow.com/questions/10121345/autoreleasepool-in-loop-or-loop-in-autoreleasepool

