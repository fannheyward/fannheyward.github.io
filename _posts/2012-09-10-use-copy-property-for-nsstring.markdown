---
layout: post
title: "Use copy property for NSString"
date: 2012-09-10 15:38
categories: [Dev]
---

一个简短例子来说明一下为什么 NSString @property 最好用 `copy` 而不是 `retain`:

```objc
#import <Foundation/Foundation.h>

@interface Person : NSObject

@property (nonatomic, retain) NSString *name;
@property (nonatomic, copy) NSString *school;

@end

@implementation Person

@synthesize name, school;

@end

int main(int argc, char *argv[]) {
    @autoreleasepool {
        Person *p = [[Person alloc] init];

        NSMutableString *s1 = [NSMutableString stringWithString:@"fannheyward"];
        NSMutableString *s2 = [NSMutableString stringWithString:@"hfut"];
        p.name = s1;
        p.school = s2;
        NSLog(@"%@, %@", p.name, p.school); // fannheyward, hfut
        [s1 appendString:@"---Heybot"];
        [s2 appendString:@"---Heybot"];
        NSLog(@"%@, %@", p.name, p.school); // fannheyward---Heybot, hfut
    }
}
```

简单来说就是 NSString 可以通过 NSMutableString (isa NSString) 来进行修改，如果 @property 是 `retain` 的话就可以绕过 Person 实例来修改 name 值（因为 name 指向 s1），大部分时候这种情况都是不应该发生的，用 `copy` 就没有这个问题。

这样来说象 NSArray/NSDictionary 等可修改类型都应该用 `copy`。

> For attributes whose type is an immutable value class that conforms to the NSCopying protocol, you almost always should specify copy in your @property declaration.

参考 [NSString property: copy or retain?](http://stackoverflow.com/a/388002/380774)

