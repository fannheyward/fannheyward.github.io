---
layout: post
title: "New Objective-C Literals"
date: 2012-11-21 21:17
categories: [Dev]
---

NSArray:

``` objc
NSInteger _appid = 12345;
NSArray *array = @[ @"title", @(_appid)];

NSString *title = array[0];
array[0] = @"newTitle";
```

NSDictionary:

``` objc
NSDictionary *dict = @{
    @"appid" : @(_appid),
    @"title" : _title,
};

NSString *title = dict[@"title"];
dict[@"title"] = @"newTitle";
```

NSNumber:

``` objc
NSNumber *intNum = @123;
NSNumber *floatNum = @1.23f;
NSNumber *boolNum = @YES;
```

More: [Objective-C Literals](http://clang.llvm.org/docs/ObjectiveCLiterals.html)

