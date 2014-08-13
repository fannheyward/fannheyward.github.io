---
layout: post
title: "使用Stylish自定义校内个人页面"
---

今天天气不好，阴沉沉的，心情也不是很好，莫名其妙的烦。周末就要考试了，没有一点看书的心情，静不下心。丫头说找点自己能做下去的事让自己的心静静，嗯，好。

-------------------分割-----------------

[Stylish](https://addons.mozilla.org/en-US/firefox/addon/2108)，一个非常有名的火狐插件，可以自定义网页css样式，改变网页样式，当然，是在本地修改，自己看着舒服。就拿它来改一下校内的个人页面。一般上校内就直接奔向个人页面的留言板，看有谁过来唧唧歪歪没有，不过留言板设置在下面，要拖半天的页面才行，为啥不把其他不必要的东西给“枪毙”了呢？

个人头像？杀掉，我自己看自己干嘛，个人信息？我自己还不知道自己啊，很少在校内上写blog，也没有相册，别人送的礼物这些乱七八糟的板块都给枪毙了，顺带把那些广告、链接、banner都给杀了。嗯，现在干净了，就剩一个留言板，Stylish代码：

```
@namespace url(http://www.w3.org/1999/xhtml);
@-moz-document url("http://xiaonei.com/getuser.do?id=********") {
#header,#sidebar,#dashNoticeyellow.atindex,#userFeed.box,#userBlog.box,#userStatus.box,#giftBox.box,#userAccount.box,#userProfile.box,#userRelations,#welcome,#permalink,#footer{
    display: none !important;
  }
}
```

******是我的编号，这个本来就是只对自己的页面弄的，就不全局了。

--------------------还是分割线-----------------------

世界干净了，哈哈，心情也好了不少，嗯，晚上看书去，加油！
