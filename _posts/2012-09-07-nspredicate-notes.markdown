---
layout: post
title: "NSPredicate Notes"
date: 2012-09-07 18:48
---

在 Core Data 中可以给 NSFetchRequest 指定一个 predicate 来对数据进行过滤以方便查找，比如：

```objc
fetchRequest.predicate = [NSPredicate predicateWithFormat:@"id == %@", 123];
```

NSPredicate 的过滤查询规则不仅仅适用于 Core Data，字符串过滤也很方便。比如：

```objc
NSPredicate *predicate = [NSPredicate predicateWithFormat:@"SELF CONTAINS %@", @"hello"];
BOOL b = [predicate evaluateWithObject:@"hello world"]; // YES
```

字符串支持的判断语法有 `contains` `beginswith` `endswith` `like` `matches` `and/or/not/in`

```objc
NSPredicate *predicate1 = [NSPredicate predicateWithFormat:@"SELF BEGINSWITH %@", @"hello"];
BOOL b = [predicate1 evaluateWithObject:@"hello world"]; // YES
BOOL n = [predicate1 evaluateWithObject:@"nohello world"]; // NO
```

`like` 匹配，支持 `*` 任意字符（可无），`?` 有且仅有一个字符：

```objc
NSPredicate *like = [NSPredicate predicateWithFormat:@"SELF LIKE %@", @"*like?"];
NSLog(@"%d", [like evaluateWithObject:@"alike"]); // 0-NO
NSLog(@"%d", [like evaluateWithObject:@"000liked"]); // 1-YES
NSLog(@"%d", [like evaluateWithObject:@"likes"]); // 1-YES
```

`matches` 正则匹配：

```objc
NSPredicate *match = [NSPredicate predicateWithFormat:@"SELF MATCHES '\\\\d+[a-z]'"];
NSLog(@"%d", [match evaluateWithObject:@"0A"]); // NO
NSLog(@"%d", [match evaluateWithObject:@"0a"]); // YES
NSLog(@"%d", [match evaluateWithObject:@"000000ab"]); // NO
NSLog(@"%d", [match evaluateWithObject:@"000000c"]); // YES
```

NSPredicate 可以组合起来用，这也是最为方便的地方，比如下面这个例子：

> 字符串以 CH 开头，长度大于 3 而小于 20 字符，包含至少一个数字，不包含 broken，不包含空格。

```objc
NSPredicate *one = [NSPredicate predicateWithFormat:@"SELF BEGINSWITH 'CH'"];
NSPredicate *two = [NSPredicate predicateWithFormat:@"SELF.length > 3 AND SELF.length < 20"];
NSPredicate *three = [NSPredicate predicateWithFormat:@"SELF MATCHES '.*\\\\d.*'"];
NSPredicate *four = [NSPredicate predicateWithFormat:@"NOT(SELF CONTAINS 'broken') AND NOT(SELF CONTAINS ' ')"];

NSArray *array = [NSArray arrayWithObjects:one, two, three, four, nil];
NSPredicate *predicate = [NSCompoundPredicate andPredicateWithSubpredicates:array];
NSLog(@"%d", [predicate evaluateWithObject:@"CH998broken"]); // NO
NSLog(@"%d", [predicate evaluateWithObject:@"CH998"]); //YES
```

`@"attributeName == %@"`: the value of the key attributeName is the same as the value of the object(NSDate, NSNumber, NSDecimalNumber, or NSString). 完全相等判断。

`@"%K == %@"`: the value of the key %K is the same as the value of the object %@. key 对应的值和给定的值相等。

`@"name IN $NAME_LIST"`: the value of the key name is in the variable $NAME_LIST. `@"'name' IN $NAME_LIST"`: the constant value 'name' (note the quotes around the string) is in the variable $NAME_LIST. 判断值是否在指定列表中，前者判断是 `name` 对应的值，后者 `'name'` 就是判断 name 字符串。

参考资料:

- [NSPredicates for Fun and Profit][1]，非常不错的 NSPredicate 介绍
- 苹果文档 [Predicate Programming Guide][2].

[1]:https://speakerdeck.com/u/kognate/p/nspredicates-for-fun-and-profit
[2]:https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/Predicates/Articles/pCreating.html

