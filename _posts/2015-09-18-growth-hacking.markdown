---
layout: post
title: Growth hacking
date: 2015-09-18 21:29:15 +0800
---

[Growth hacking][0] 是市场运营通过技术形式获取用户的方法，包括数据分析，社交网站，EDM 等，据说 Facebook 还有专门的 Growth Team。今天见识了这种方法的力量。

起因是乌云的这篇文章：[XCode编译器里有鬼 – XCodeGhost样本分析][1]，Xcode 被挂马，网易云音乐中招，看后顺手测了自己常用的应用，发现另外几个中招，在群里吐槽后就没再继续关注，之后又看见微博有人在转，就发了 Twitter：

> 通过 Charles 抓包，会向 http://init.icloud-analysis.com  发请求的有网易云音乐，中信银行动卡空间，12306，滴滴打车 #XcodeGhost [13:41][2]

发之前就在想这个肯定会爆掉，但没想到有这么火爆：

1. 迅速被 RT，涨 fo。
2. 约十五分钟后被转发到微博，包括 @Fenng，@onevcat 等大 V 二次转发。
3. V2EX，知乎，36kr，iApps，虎嗅等科技网站发帖，有引用 Twitter 链接/截图 [1][11] [2][22] [3][33] [4][44] [5][55]
4. 15:10 腾讯科技 [App Store遭病毒入侵 网易云音乐等中招][6]，而且他们应该是有通过 Linkedin 查看我的工作信息，之后该文被其他多家引用。

根据 Tweet Activity 统计，原推一共 impressions 14000+，engagements 1300+，RT 170+，followers 增长 100+，考虑到访问 Twitter 的困难，这个数据还是非常恐怖的。微博的量应该更大。

这是 Growth hacking 的一次直观感受，如果产品推广也能有这样的效果该多好 :D

----

作为开发者，#XcodeGhost 要引起重视:

1. 正当渠道下载应用，不限于 Xcode，检查签名/checksum。
2. 用到的第三方 SDK 也要检查来源，设想微信 SDK 被调包？！
3. 重视安全，一旦被人发现没穿裤子，负面信息足以摧毁一个产品。


[0]:https://en.wikipedia.org/wiki/Growth_hacking
[1]:http://drops.wooyun.org/news/8864
[2]:https://twitter.com/fannheyward/status/644747940020424704
[11]:https://www.v2ex.com/t/221744
[22]:https://www.v2ex.com/t/221722
[33]:http://www.zhihu.com/question/35721299
[44]:http://www.iapps.im/single/33996
[55]:http://www.huxiu.com/article/126355/1.html
[6]:http://tech.qq.com/a/20150918/049301.htm
