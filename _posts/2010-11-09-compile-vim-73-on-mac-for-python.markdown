---
layout: post
title: "Compile vim 7.3 on Mac for Python"
---

之所以想编译安装 vim 是因为一个 python vim script 需要 +python 支持，而 Mac 下默认的 vim 7.2 并没有 +python，所以每次 vim xx.py 的时候都会有一个警告；另一个原因就是 vim 7.3 is released，版本控。

Get the source first:

> `hg clone https://vim.googlecode.com/hg/ vim`

cd to the vim source directory and:

```
./configure --with-features=huge --enable-cscope --enable-pythoninterp --enable-rubyinterp --enable-perlinterp  --enable-tclinterp   --enable-multibyte --enable-cscope --disable-gui

make && make install
```

Done.

