---
layout: post
title: "IPV6的惊喜！"
---

网上发现IPV6的一个大大的惊喜：

> 所有的IPV4站点都可以用http://(原URL).sixxs.org来访问！！

而且这样可以上以前要挂代理才能上的网站。天啊，太爽了，要知道教育网的封闭可以害死多少人啊，查个东西都得挂代理，免费的代理不好弄，得花钱买啊，这下可好了，哈，有了这个法宝，哼哼，哈哈！

貌似这个东西翻墙也行，比如 http://zh.wikipedia.org.sixxs.org 可以上的，太帅了，学校网络中心终于让我爽了一次！

Update: 貌似 HTTPS 加密站点还走不出去

UpdateUp：网上找了一个Bookmarklet，收藏了，这样碰到打不开的网站，轻轻一点，哼哼哈哈！

```
javascript:void((function(){location.href=location.href.replace(/^http\:\/\/([^\/\@]+)\/(?:)/,%22http://%22+%22$1%22.replace(%22\:%22,%22.%22)+%22.sixxs.org/%22);})())
```

