---
layout: post
title: "Bootstrap 3 Grid 笔记"
date: 2013-10-30 22:21
---

作为非专业的前端开发，Bootstrap 真是个好东西，特别适合做运营、管理系统界面。这些系统界面要求不高，干净整齐就好，最主要的就是网格 Grid 的使用，简单记录一下。

Bootstrap 3 自带了移动优先的响应流式网格布局系统，将整个屏幕或某一视区(viewport)划分为 12 列，使用时把内容放到相应列中，自然就整齐不乱。一般来说 Bootstrap 的网页结构是 `container` > `row` > `col`，一个或多个 col 组成一组 row，多个 row 归于一个 container，这样的多级布局很方便在大小不同的屏幕灵活布局。

最小单位 col 有四种：`col-xs-*`, `col-sm-*`, `col-md-*`, `col-lg-*`，(题外话，Bootstrap 这四个 col 命名实在是让人费解，也不是什么缩写，完全没有 Foundation 的 `small-2 large-4 columns` 简洁明了)，分别适用于手机(768px 以下)，平板(768-992px)，桌面(992px+)和超大屏幕(1200px+)，后一位是需要的宽度比例，总和为 12，这样就自动把界面进行划分布局，比如想把一个普通电脑屏幕左右平分，两个 `col-md-6` 即可。col 可以组合，这样就同时适配手机和电脑，比如在电脑是左右三等分，手机是二等分：

```html
<div class="container">
  <div class="row">
    <div class="col-md-4 col-xs-6">
      A
    </div>
    <div class="col-md-4 col-xs-6">
      B
    </div>
    <div class="col-md-4 col-xs-6">
      C
    </div>
  </div>
</div>
```

col 也可以嵌套，要注意的是每个 col 里又是一个 12 等分的完整网格，也要包在二级容器 row 里。比如左右二等分，每个再 1:2 划分:

```html
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <div class="row">
        <div class="col-sm-4">
          A
        </div>
        <div class="col-sm-8">
          B
        </div>
      </div>
    </div>
    <div class="col-md-6">
      ...
    </div>
  </div>
</div>
```

网格还有一个方便的东西就是 Offset `.col-md-offset-*`，可以把某一 div 向右偏移指定比例，比如只一半的宽度，然后居中，3-6-3 布局：

```html
<div class="container">
  <div class="row">
    <div class="col-sm-6 col-sm-offset-3">
      S
  </div>
</div>
```

参考 [Bootstrap 3: the new grid system, for starters](http://www.williamghelfi.com/blog/2013/06/09/bootstrap-3-the-new-grid-system-for-starters/).

