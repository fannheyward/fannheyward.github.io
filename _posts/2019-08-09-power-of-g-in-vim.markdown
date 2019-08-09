---
layout: post
title: Power of g in Vim
date: 2019-08-09 18:31:21 +0800
---

`:[range]g[!]/pattern/cmd`

`!` means **do not** match pattern, cmd list:

- `d`: delete
- `m`: move
- `t`: copy, or `co`
- `s`: replace

for more info:

- `:help ex-cmd`
- [Power of g](https://vim.fandom.com/wiki/Power_of_g)