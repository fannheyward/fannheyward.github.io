---
layout: post
title: "使用 strings 查看静态库字符串"
date: 2013-05-13 22:24
categories: [Dev]
---

起标题真费劲，意思就是用 OS X 的 `strings` 命令查看一个静态库是否包含某个字符串。比如 lib.a 是否用到了 uniqueIdentifier (苹果新规用了 UUID 的应用将会被拒)。

> strings - find the printable strings in a object, or other binary, file.

用法很简单:

```
strings lib.a|ag uniqueIdentifier
```

这个强大的命令可以做很多事情，比如[这个][1]。

[strings](http://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/strings.1.html) manual page.

Update: 查看当前路径下引用了 UUID 的文件:

```
find . | grep -v .git | grep -v "\.app" | grep "\.a" | xargs grep uniqueIdentifier
```

[1]:http://rndc.or.id/wiki/index.php/%28Ab%29Using_Twitter_Client#Twitter_for_iPhone

