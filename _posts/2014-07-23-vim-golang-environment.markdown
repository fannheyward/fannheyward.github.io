---
layout: post
title: "Vim Golang 开发环境: vim-go"
date: 2014-07-23 22:04:25 +0800
---

安装 Golang 并设置 `$GOPATH`:

```
export GOPATH="$HOME"
export PATH="$PATH:$GOPATH/bin"
```

Golang 官方提供了 Vim 开发工具 `$GOROOT/misc/vim`，但功能很弱，所以有很多第三方的辅助开发应用：

1. [gocode][1] 自动代码补全
1. [godef][2] 函数定义跳转，快捷键 `gd`
1. [goimports][3] 自动 import 包管理
2. [gotags][4] 展示当前代码里函数列表，配合 tagbar 使用

这几个是独立的应用，配套相应的 Vim 插件，单独安装很是繁琐。而 [vim-go][5] 是一整套的 Golang Vim 开发配置，安装插件后通过 `GoInstallBinaries` 安装 `gocode`, `godef`, `goimports`, `gotags`, `golint`, `oracle`, `errcheck` 以及相应的 Vim 插件、配色、代码块，非常方便。

`Plugin 'fatih/vim-go'` 安装，默认代码补全引擎是 Ultisnips，修改为 neosnippet `let g:go_snippet_engine = "neosnippet"`。

我的 [vimrc][6].

[1]:https://github.com/nsf/gocode
[2]:http://godoc.org/code.google.com/p/rog-go/exp/cmd/godef
[3]:https://github.com/bradfitz/goimports
[4]:https://github.com/jstemmer/gotags
[5]:https://github.com/fatih/vim-go/
[6]:https://github.com/fannheyward/vimrc

