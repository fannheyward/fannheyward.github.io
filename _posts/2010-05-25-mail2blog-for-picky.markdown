---
layout: post
title: "Mail2Blog for Picky"
---

在 [Why GAE? Why Picky?](http://blog.fann.im/why-gae-why-picky) 里我有考虑过 Posterus、Blogger、WordPress.com 这种“云” BSP，只因为一个原因，就是他们都支持邮件发表博文。所以我就把 Mail2Blog 功能山寨到 Picky。

参考 GAE SDK Receiving Mail 总共几十行代码就搞定了，GAE 威武。现在的功能还非常简陋，只接收指定的 Email 地址邮件，只能发布 Post 不能 Page（因为我把 article.is_page = False）。

用 Email（准确说是 Gmail）来写博客，好处不必说，实时保存，HTML 排版等等，实在是方便。

