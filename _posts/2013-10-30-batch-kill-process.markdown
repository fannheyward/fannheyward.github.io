---
layout: post
title: "批量杀进程"
date: 2013-10-30 21:30
categories: [Dev]
---

批量杀掉包含某一关键字的进程：

```
ps aux|grep KEY|grep -v grep|awk {'print $2'}|xargs kill -9
```

