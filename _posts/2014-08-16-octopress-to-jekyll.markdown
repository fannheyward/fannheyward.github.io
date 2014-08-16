---
layout: post
title: "Octopress to Jekyll"
date: 2014-08-16 14:38:51 +0800
---

周末花时间把 blog 从 [Octopress 2][1] 迁移到 [Jekyll][2]。

Octopress 是个非常好的 Jekyll-blog 解决方案，尤其是在 Jekyll 0.x 时代，Octopress 有不错的模版，丰富的扩展功能，缺点就是麻烦，需要在本地生成页面。

Jekyll 在过去一年[开发迭代非常快][3]，大量的新功能新特性加入让 Octopress 显得不那么必要。GitHub Pages 最近也升级[支持 Jekyll 2.2][4]，于是就有了这次迁移。

1. 通读 [Jekyll 文档][5]，了解新功能特性。
2. 本地安装 `gem install github-pages`，模拟 GitHub Pages 环境测试。
3. 修改 `permalink: /blog/:year/:month/:day/:title` 保持链接不变。
4. 设置 markdown 解析器为 `markdown: redcarpet`，支持 GFM。
5. 分页设置 `paginate: 10 paginate_path: "blog/page/:num"`，保持兼容。
6. 配置 Google Analytics，Webmaster Tools 等。

测试没问题推送到 GitHub 即可。

[Octopress 3][6] 也改变策略，不再那么复杂，只是对 Jekyll 操作进行二次封装，方便使用。目前来看封装的功能都不太需要，一个简单的 Rakefile 就够了。

[1]:http://octopress.org/
[2]:http://jekyllrb.com/
[3]:https://github.com/jekyll/jekyll/releases
[4]:https://github.com/blog/1867-github-pages-now-runs-jekyll-2-2-0
[5]:http://jekyllrb.com/docs/home/
[6]:https://github.com/octopress/octopress