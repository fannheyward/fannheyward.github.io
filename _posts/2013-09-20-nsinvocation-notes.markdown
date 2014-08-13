---
layout: post
title: "NSInvocation Notes"
date: 2013-09-20 09:35
categories: [Dev]
---

iOS 中一般用 `performSelector` 系列方法调用某个对象的方法消息，但是参数过多就不太方便，这时候就可以用 NSInvocation。一个简单的例子：

```objc
NSMethodSignature *sig = [self methodSignatureForSelector:@selector(addAlbum:atIndex:)];
NSInvocation *action = [NSInvocation invocationWithMethodSignature:sig];
[action setTarget:self];                            //0
[action setSelector:@selector(addAlbum:atIndex:)];  //1
[action setArgument:&deletedAlbum atIndex:2];       //2
[action setArgument:&currentAlbumIndex atIndex:3];  //3
[action retainArguments];
[action invoke];
```

`NSMethodSignature` 直译就是方法签名，保存了方法的参数类型和返回值信息 (type information for the arguments and return value of a method)。 通过方法签名信息就可以完整构建一个 invocation，对各个参数进行赋值后激活执行，也就完成了对象方法调用。

再看 [NSMethodSignature][1] 一段文档：

> Indices begin with 0. The hidden arguments self (of type id) and _cmd (of type SEL) are at indices 0 and 1; method-specific arguments begin at index 2.

NSInvocation 第一步设定 Target(0)，第二步设定 Selector(1)，然后从 index 2 开始依次对参数赋值，因为 0/1 已被 Target/Selector 占用。要注意赋值的时候传的都是 **指针** ，如果赋值参数可能会被释放，要记得 retainArguments。如果需要 NSInvocation 执行后的返回值：

```objc
NSString *returnString = nil; //假定返回值类型为 NSString
[action getReturnValue:&returnString];
```

最后附上 Three20 里用 NSInvocation 实现多参数 performSelector:

```objc
https://github.com/facebook/three20/blob/1.0.12/src/Three20Core/Sources/NSObjectAdditions.m#L89

- (id)performSelector:(SEL)selector
           withObject:(id)p1
           withObject:(id)p2
           withObject:(id)p3
           withObject:(id)p4
           withObject:(id)p5
{
    NSMethodSignature *sig = [self methodSignatureForSelector:selector];
    if (sig) {
        NSInvocation* invo = [NSInvocation invocationWithMethodSignature:sig];
        [invo setTarget:self];
        [invo setSelector:selector];
        [invo setArgument:&p1 atIndex:2];
        [invo setArgument:&p2 atIndex:3];
        [invo setArgument:&p3 atIndex:4];
        [invo setArgument:&p4 atIndex:5];
        [invo setArgument:&p5 atIndex:6];
        [invo invoke];

        if (sig.methodReturnLength) {
            id anObject;
            [invo getReturnValue:&anObject];
            return anObject;
        } else {
            return nil;
        }
    } else {
        return nil;
    }
}
```

[1]:https://developer.apple.com/library/ios/documentation/cocoa/reference/foundation/Classes/NSMethodSignature_Class/Reference/Reference.html

