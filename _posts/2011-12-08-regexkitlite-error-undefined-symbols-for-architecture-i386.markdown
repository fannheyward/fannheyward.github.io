---
layout: post
title: "RegexKitLite Error: Undefined symbols for architecture i386"
date: 2011-12-08 15:39
categories: [Dev]
---

RegexKitLite 编译错误：

```
Undefined symbols for architecture i386:
  "_uregex_start", referenced from:
      _rkl_performRegexOp in RegexKitLite.o
      _rkl_search in RegexKitLite.o
      _rkl_findRanges in RegexKitLite.o

ld: symbol(s) not found for architecture i386
```

解决办法：

In project Build Setting search "Other Linker Flags" and add "-licucore".

编译设置搜索 "Other Linker Flags" 添加 "-licucore" 字段

