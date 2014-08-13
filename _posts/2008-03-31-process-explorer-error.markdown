---
layout: post
title: "Process Explorer报错：这个系统的 .NET 性能计数器已损坏"
---

先把错误信息贴出来：

```
这个系统的 .NET 性能计数器已损坏。请从 Microsoft Windows 资源工具箱运行 Exctrlst 来修复它们。
```

Process Explorer是个相当不错的进程管理工具，一直都用这个东西。今天电脑有点小卡，习惯性的打开PE，报错，性能计数器？Google了一下，解决办法：

1. 微软官方下载Exctrlst。
2. 安装，运行，选择Counter，然后找到并选择列表里的.NETFramework。
3. 将Performance Counters Enable的勾去掉，"Refresh"。
4. 搞定，不过那个性能计数器是个什么东西？
