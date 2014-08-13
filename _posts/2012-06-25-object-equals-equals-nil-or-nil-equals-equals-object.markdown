---
layout: post
title: "object == nil or nil == object"
date: 2012-06-25 18:44
categories: [Dev]
---

在 Objective-C 中拿到一个对象后检查对象是否为空，一般有两种写法

一：

```
if (object == nil) {
    //...
}
```

二：

```
if (nil == object) {
    //...
}
```

这两种写法其实没有任何区别，从代码的可读性上来说第一种 `object == nil` 方式会好一点。但是推荐用第二种 `nil == object` 方式，最大的好处就是如果由于笔误 `==` 写成了 `=`，编译器会直接报错处理。而 `object = nil` 不会报错，一旦笔误写成了 `object = nil` 是很难 debug 查找问题。

via [object == nil or nil == object to check whether an object is nil?][1]

[1]:http://stackoverflow.com/q/11186715/380774

