---
layout: post
title: "Firefox 下flashgot调用迅雷出现AddRef错误"
---

实在不知道该怎么形容这个错误了，上图：

![](http://lh5.ggpht.com/_vYr4JQreqXA/STTAYRTrnRI/AAAAAAAAAkk/53BouOMpj6M/s400/flashgot.JPG)

虽然每次都可以手动改存储目录跟名称，但毕竟不是很方便，恼人的bug。解决办法：打开 `about:config`，定位 `flashgot.autoReferrer`，将其属性改为false，重启firefox即可。
