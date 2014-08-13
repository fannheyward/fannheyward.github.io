---
layout: post
title: "GreaseMonkey自用脚本分享"
---

GreaseMonkey 称得上是 Firefox 众多扩展中的神器，通过对 javascript 脚本解释执行来实现对网页进行二次加工，实现一些网页本身不具备的功能。下面是我自己现在用的 Greasemonkey 脚本，分享之，记录之。（排名不分先后）

1. Auto add to Google Reader.解决订阅 RSS 时候自动订阅到 Greader 而不是 Add to Google homepage 和 Greader 的手动选择。
2. RSS+Atom Feed Subscribe Button Generator.简单的说就是自动发现并在页面左上角显示网站可用的 RSS/Atom 地址。
3. HTTP-to-HTTPS redirector.自动替换 URL 中的 Http 为 Https 加密访问，好处都知道，建议手动添加白名单：Twitter，FriendFeed，Google Groups。
4. Wordpress Comments AutoSignature.自动填写 WP 博客回复框里个人信息内容，包括昵称，Email，个人网址，安装后在 about:config 中设置，关键字过滤：wordpress。
5. Auto-Select Inputs and Textareas.鼠标指向输入框/文本框时候自动选定，省去一次点击。
6. Google Time & Language Select.在 Google 搜索框旁边添加选择搜索时间范围和搜索语言选项，其中搜索时间范围很有用，可以指定搜索24小时以内或一周以内的网页。
7. Reply buttons for new Douban.给豆瓣评论/小组/日记等可回复的帖子添加回复和引用按钮。
8. Get Picasaweb Image URL.方便获取各种尺寸的 Picasa Web 图片外链地址。
9. Google Language API Translator Tooltip[modifed].翻译选中的文字，用的是 Google 翻译的 API，可指定各种语言，非常棒。

Greasemonkey 的扩展性和 Fx 的扩展性一样强大，[官网](http://userscripts.org/)上数以万计的脚本极大的丰富了网页功能，带来更为方便的浏览体验。
