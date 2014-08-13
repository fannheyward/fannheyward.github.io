---
layout: post
title: "Don't use accessor methods in init and dealloc"
date: 2012-08-14 11:53
categories: [Dev]
---

苹果在 WWDC 2012 Session 413 - Migrating to Modern Objective-C 里强调不要在 init 和 dealloc 里使用 accessor methods：

> Always use accessor methods. Except in initializer methods and dealloc.

之前没有注意过这种情况，稍微搜索学习了一下。文档 [Memory Management][1] 里确实有这说法：

> The only places you shouldn’t use accessor methods to set an instance variable are in initializer methods and dealloc.

提倡下面这种写法：

```objc
- (id)init {
    self = [super init];
    if (self) {
        _count = [[NSNumber alloc] initWithInteger:0];
    }
    return self;
}

- (id)initWithCount:(NSNumber *)startingCount {
    self = [super init];
    if (self) {
        _count = [startingCount copy];
    }
    return self;
}
```

dealloc 不能用比较好理解，self.property 是向 property 发了一个消息，有可能该对象的生命周期已经结束，不能再接受消息。init 不能用比较靠谱的说法是如果有 subClass 并重载了 accessor，那么 init 里 self.property 就无效；另外也可能会有其他影响，比如 KVC notifications 等。

SO 参考帖子:

1. [Should I refer to self.property in the init method with ARC?][2]
1. [Using properties to access iVars in init?][3]
1. [Initializing a property, dot notation][4]
1. [Objective-C Dot Syntax and Init][5]

[1]:https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/MemoryMgmt/Articles/mmPractical.html#//apple_ref/doc/uid/TP40004447-SW4
[2]:http://stackoverflow.com/a/8056260/380774
[3]:http://stackoverflow.com/a/4091119/380774
[4]:http://stackoverflow.com/a/5932733/380774
[5]:http://stackoverflow.com/a/3150906/380774

