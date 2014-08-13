---
layout: post
title: "Difference between objectForKey and valueForKey in NSDictionary"
date: 2012-04-12 19:56
categories: [Dev]
---

从 NSDictionary 取值的时候有两个方法，`objectForKey:` 和 `valueForKey:`，这两个方法具体有什么不同呢？

先从 NSDictionary 文档中来看这两个方法的定义：

> objectForKey: returns the value associated with aKey, or nil if no value is associated with aKey. 返回指定 key 的 value，若没有这个 key 返回 nil.

> valueForKey: returns the value associated with a given key. 同样是返回指定 key 的 value。

直观上看这两个方法好像没有什么区别，但文档里 `valueForKey:` 有额外一点：

> If key does not start with “@”, invokes objectForKey:. If key does start with “@”, strips the “@” and invokes [super valueForKey:] with the rest of the key. via [Discussion][1]

一般来说 key 可以是任意字符串组合，如果 key 不是以 **@** 符号开头，这时候 `valueForKey:` 等同于 `objectForKey:`，如果是以 **@** 开头，去掉 key 里的 @ 然后用剩下部分作为 key 执行 `[super valueForKey:]`。

比如：

```
NSDictionary *dict = [NSDictionary dictionaryWithObject:@"theValue"
                                                 forKey:@"theKey"];
NSString *value1 = [dict objectForKey:@"theKey"];
NSString *value2 = [dict valueForKey:@"theKey"];
```

这时候 `value1` 和 `value2` 是一样的结果。如果是这样一个 dict：

```
NSDictionary *dict = [NSDictionary dictionaryWithObject:@"theValue"
                                                 forKey:@"@theKey"];// 注意这个 key 是以 @ 开头
NSString *value1 = [dict objectForKey:@"@theKey"];
NSString *value2 = [dict valueForKey:@"@theKey"];
```

`value1` 可以正确取值，但是 `value2` 取值会直接 crash 掉，报错信息：

> Terminating app due to uncaught exception 'NSUnknownKeyException', reason: '[<__NSCFDictionary 0x892fd80> valueForUndefinedKey:]: this class is not key value coding-compliant for the key theKey.'

这是因为 `valueForKey:` 是 `KVC(NSKeyValueCoding)` 的方法，在 KVC 里可以通过 property 同名字符串来获取对应的值。比如：

```
@interface Person : NSObject
@property (nonatomic, retain) NSString *name;
@end

...
Person *person = [[Person alloc] init];
person.name = @"fannheyward";

NSLog(@"name:%@", [person name]);
//name:fannheyward
NSLog(@"name:%@", [person valueForKey:@"name"]);
//name:fannheyward
[person release];
```

`valueForKey:` 取值是找和指定 key 同名的 property accessor，没有的时候执行 `valueForUndefinedKey:`，而 `valueForUndefinedKey:` 的默认实现是抛出 `NSUndefinedKeyException` 异常。参考[Getting Attribute Values Using Key-Value Coding][2]

回过头来看刚才 crash 的例子， `[dict valueForKey:@"@theKey"];` 会把 key 里的 @ 去掉，也就变成了 ` [dict valueForKey:@"theKey"];`，而 dict 不存在 `theKey` 这样的 property，转而执行 ` [dict valueForUndefinedKey:@"theKey"];`，抛出 `NSUndefinedKeyException` 异常后 crash 掉。

`objectForKey:` 和 `valueForKey:` 在多数情况下都是一样的结果返回，但是如果 key 是以 @ 开头，`valueForKey:` 就成了一个大坑，建议在 NSDictionary 下只用 `objectForKey:` 来取值。

[1]:https://developer.apple.com/library/mac/#documentation/Cocoa/Reference/Foundation/Classes/nsdictionary_Class/Reference/Reference.html
[2]:https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/KeyValueCoding/Articles/BasicPrinciples.html#//apple_ref/doc/uid/20002170-BAJEAIEE

