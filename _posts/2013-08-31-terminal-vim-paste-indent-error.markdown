---
layout: post
title: "终端下 Vim 粘贴缩进错乱"
date: 2013-08-31 11:02
---

终端下 Vim 粘贴代码时会有缩进错乱，原因是终端下的 Vim 是通过模拟用户输入来完成粘贴操作，所以缩进就错乱了。解决方法是每次粘贴前 `set paste`，完成后 `set nopaste`，嫌麻烦的话可以设置一个快捷键来切换 paste 状态 `set pastetoggle=<F2>`.

另外 Vim 下 Ctrl-C 和 ESC 根本不是一码事，Ctrl-C 不会响应 InsertLeave，所以 `autocmd InsertLeave * setlocal nopaste` 在 Ctrl-C 时是不会执行的。

