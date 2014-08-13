---
layout: post
title: "批处理新建树结构文件夹"
---

工作需要，每次纳品时候都要把项目源码，配置文件等等放在一个文件夹下各个指定的不同目录里然后打包，比如项目文件夹是 PM ，配置文件里放在 PM 下 INI 文件夹，源码放在 SRC 目录下。每次都要手动新建一堆文件夹，烦人，就用批处理随便搞了一下。（原本想用 Python 的，不过感觉太高射炮打蚊子了）

```
@echo off
:main
echo Input the Folder Name.
set /p name=
if exist %name% (
    echo Had the same Folder.
    goto main)
else (
md %name%
cd %name%
md SRC INI xxx)
```

很简单，很偷懒。

