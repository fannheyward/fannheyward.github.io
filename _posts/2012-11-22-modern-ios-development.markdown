---
layout: post
title: "Modern iOS Development"
date: 2012-11-22 15:00
---

iOS 开发是一个进化非常快的技术领域，每年一更新的 iOS SDK 都会带来很多新东西，所以如果你现在用着和一年前一样的 code 做产品，虽然功能上没有差别，但是从技术上来说自身的成长进步非常有限。简单总结一下现在比较 modern 的开发方式。(截至 2012 年底)

### ARC

iOS SDK 5 引进来的 ARC 已经非常成熟，是时候用了。ARC 可以大大减少各种不小心造成的内存泄漏，减少各种费脑子的内存问题 debug，这时候再手动内存管理完全是给自己增加工作。现在主流第三方库都已经 ARC ready 了，迁移成本很小。

### Blocks

并不是说 delegate 有多不好，用 blocks 封装的接口使用起来非常轻便，尤其是网络请求等需要异步操作的时候，简单明了。

### New Objective-C Literals

参考 [New Objective-C Literals][1]:

``` objc
NSInteger _appid = 12345;
NSArray *array = @[ @"title", @(_appid)];

NSString *title1 = array[0];
array[0] = @"newTitle";

NSDictionary *dict = @{
    @"appid" : @(_appid),
    @"title" : _title,
};

NSString *title2 = dict[@"title"];

NSNumber *intNum = @123;
NSNumber *floatNum = @1.23f;
NSNumber *boolNum = @YES;
```

掌握新语法并不能说明技术能力有多高，但可以减少很多体力劳动，不需要敲很多 `objectAtIndex:` `objectForKey:`，代码结构也更为清晰。

### @Synthesize by Default

以前：

``` objc
@interface Person : NSObject
{
    NSString *_name;
}

@property (nonatomic, strong) NSString *name;

@end

@implementation Person

@synthesize name = _name;

@end
```

现在：

``` objc
@interface Person : NSObject

@property (nonatomic, strong) NSString *name;

@end

@implementation Person

@end
```

Xcode 4.4+ 会自动做 @synthesize，成员变量都可以不用手动声明，直接下划线开头 _var 形式。一来节省代码量，二来鼓励用 property，Always use accessor methods, [Except in initializer methods and dealloc.][2]，保证健壮性。

### Modern Library and Tools

iDev 免不了要用到很多第三方库，这时候最好选用那些较新且成熟的库，是否支持 ARC 等。比如 AFN vs ASI，我个人非常喜欢 [AFN][3] 的设计，简单方便易扩展。

第三方库多了管理就是问题，现在有了 [CocoaPods][4] 一切变得都很简单，团队之间的分享协作也会方便很多，不会出现两边因为公共库版本不一致带来 bug 问题。

参考：

* WWDC 2012 Session 405 - Modern Objective-C
* WWDC 2012 Session 413 - Migrating to Modern Objective-C.

[1]:https://fann.im/blog/2012/11/21/new-objective-c-literals/
[2]:https://fann.im/blog/2012/08/14/dont-use-accessor-methods-in-init-and-dealloc/
[3]:https://fann.im/blog/2012/08/21/afnetworking-notes/
[4]:https://fann.im/blog/2012/10/31/cocoapods-notes/

