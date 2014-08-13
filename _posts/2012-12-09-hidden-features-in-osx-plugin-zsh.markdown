---
layout: post
title: "Hidden Features in osx.plugin.zsh"
date: 2012-12-09 19:12
categories: [Share]
---

oh-my-zsh 自带了很多插件，其中 osx.plugin.zsh 里有不少好东西。

1. `cdf` 快速在终端打开当前 Finder 所在目录。之前的方法是用 cdto，缺点是会另外开一个终端窗口；或者鼠标拖动目录到终端再 cd。cdf 就省力很多，也是这个插件最喜欢的一个命令。
1. `trash` 替换 rm，文件被移动到废纸篓而不是真正删除，避免误操作。`alias rm='trash'`
1. `pfd/pfs` 打印当前 Finder 所在目录，一般配合 cdf 来用。
1. `pushdf` pushd 寄存当前 Finder 所在目录。
1. `quick-look` 调用 QuickLook 查看文件，配合 QLMarkdown.qlgenerator 快速预览 Markdown 文件。
1. `man-preview` 把 man 信息生成 pdf 然后用预览打开。
1. `tab/split_tab/vsplit_tab` 新建、切割终端 tab，不太习惯切割终端，这个用的很少。

