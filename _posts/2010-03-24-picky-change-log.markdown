---
layout: post
title: "Picky 改动记录"
---

先谢国家，再谢 [picky][picky]，简洁而强大的 Blog powered by GAE。自己做了一点点改动，记录一下，下次升级时候备忘。

1. main.py - 添加全局变量 **`template_values = {}`**. RobotsHandler 生成 robots.txt 的时候没有对 template_values 定义赋值，造成 robots.txt 生成不能。
2. robot.txt 修改 sitemap.xml 为绝对地址，跟第一个有关.
3. 删掉了 default 主题 sidebar.html、article.html 两个模板文件里的 Google Ads。
4. header.html 追加 Google Webmaster Meta 验证。
5. 换了 Favicon。

[picky]:http://picky.olivida.com/picky

