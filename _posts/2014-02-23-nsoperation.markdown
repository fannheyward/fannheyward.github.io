---
layout: post
title: "NSOperation 笔记"
date: 2014-02-23 20:55
---

iOS 下的多线程编程有 NSOperation 和 Grand Central Dispatch(GCD) 两种，简单记一些 NSOperation 的使用注意。

`NSOperationQueue` 相当于一个操作池，operation 添加进来后会按照 First-In-First-Out(FIFO) 的策略自动执行。operation 一般会添加到应用全局共享的自定义 queue，这样避免阻塞主线程的执行。

一些简单的多线程需求没必要动用 NSOperation 这个大家伙，`NSInvocationOperation` 就很方便：

```objc
NSInvocationOperation *op = [[NSInvocationOperation alloc] initWithTarget:self
                                                                 selector:@selector(anyWork)
                                                                   object:nil];
[operationQueue addOperation:op];

- (void)anyWork
{
    //perform any work in operation
}
```

NSInvocationOperation 不是很方便共享操作，如果某个操作会在很多地方需要，就可以做个 NSOperation 子类封装：

```objc
@implementation CustomOperation

- (void)main
{
    //perform any work in operation
}

@end
```

这个子类只实现了 `main` 方法，相较 NSInvocationOperation 方便共享。如果需要对操作做更多细致化的功能，比如状态控制，就需要更加复杂的继承实现，参见 [AFURLConnectionOperation][1]，这种情况下不继承 `main`，而是继承实现 `start` `cancel`等，然后通过 KVO 手动控制操作状态的切换。

NSOperation 可以设置依赖，A 操作依赖 B 操作完成后才能做，那么就可以设置 B 为 A 的依赖 `[A addDependency:B];`.

如果各个操作之间没有依赖关系，但是又需要在全部操作都完成后做一些善后工作，有两个解决方案，一是添加所有操作为善后操作的依赖，这样所有其他操作完成后善后操作才会执行，这个方法较为死板，或者可以用 KVO 监听队列操作数，等操作都完成后队列操作为空的时候做善后工作：

```objc
[operationQueue addObserver:self forKeyPath:@"operationCount" options:0 context:nil];

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
{
    if (object == operationQueue && [keyPath isEqualToString:@"operationCount"]) {
        if (operationQueue.operationCount == 0) {
			// any final operation.
        }
    } else {
        [super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
    }
}
```

#### NSOperation or GCD

NSOperation 和 GCD 都能满足多线程需要，那么该选哪个？[When to use NSOperation vs. GCD][2] 的观点：

> Always use the highest-level abstraction available to you, and drop down to lower-level abstractions when measurement shows that they are needed.

NSOperation 相比 GCD 提供了更多功能，比如操作执行状态，操作执行的暂停、取消，比如操作之间的依赖，比如控制操作队列同一时间可执行操作的数量。

GCD 相比 NSOperation 使用方便，系统开销小性能好。

实际项目中较为简单的小操作直接 GCD，灵活方便；规模较大控制复杂的操作还是通过 NSOperation 为好，也能享用高级 API 提供的方便。

[1]:https://github.com/AFNetworking/AFNetworking/blob/master/AFNetworking/AFURLConnectionOperation.h
[2]:http://eschatologist.net/blog/?p=232

