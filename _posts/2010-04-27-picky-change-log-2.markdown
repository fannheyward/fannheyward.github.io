---
layout: post
title: "Picky 改动记录二"
---

从 hg 拿到 Picky 最新代码，改了一点点，部署成功。留个记录：

1. writer.py line 211 添加 try..except，解决不能登录后台。这个好像是 Twitter Search 和 GAE memcache 的问题，好像 Twitter Search 默认只能搜索七天（?）内的 Tweets，这样如果之前在 Twitter 上有链接到博客，memcache 里的 mentions_twitter 不为空，但是时间长以后 mentions_twitter 获取不到 [ 'results' ]，造成登录后台时候错误，KeyError: 'results'。
2. robots.txt 修改 sitemap.xml 为绝对地址，RobotsHandler 生成 robots.txt 的时候没有对 template_values 赋值；
3. 删除两个主题 sidebar.html、article.html、footer.html 模板里的 Google Ads；
4. header.html 追加 Google Webmaster Meta 验证；
5. 更换 Favicon.

PS：刚部署完，就发现 Livid 追加了一个新功能，Tweets:Latest 20 Tweets by @livid，期待已久的功能，目前 hg 里代码还没有更新，回头再更新。准备偷师一下这个 Tweets 的实现，看能不能把腾讯微博的给添加进来。Oh NO,腾讯微博连 RSS 都不支持，WTF!

