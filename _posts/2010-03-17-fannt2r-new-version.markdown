---
layout: post
title: "Fannt2r New Version"
---

Fannt2r 是一个同步我的 Twitter 到人人的一个 GAE 应用，参考网上教程自己瞎搞出来的。现在是 cron 5分钟一次 LoginRenren、GetTweet、SendStatus，基本满足。早上在路上的时候想到了一个新的实现方式，备忘一下：

1. 先 GetTweet，然后判断 if synctag in status:
2. 然后再 LoginRenren、SendStatus。

这样可以 cron 一分钟跑一次，时效性更高，也不会因为过于频繁的 fetch 登录人人造成帐号被冻结。

