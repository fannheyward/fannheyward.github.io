---
layout: post
title: "Vim 多文件查询"
---

多文件查询是指在多个文件内查询同一字段。命令 **:vimgrep**：

> `:vim[grep][!] /{pattern}/[g][j] {file}`

For example，递归当前目录及子目录，在所有 py 文件中查询 main，\\C 区分大小写，\\c 不区分大小写。

> `:vimgrep /\Cmain/ **/*.py`

These commands all fill a list with the results of their search. "grep" and "vimgrep" fill the "quickfix list", which can be opened with **:cw**  or **:copen**, and is a list shared between ALL windows.via [Find in files within Vim]( http://vim.wikia.com/wiki/Find_in_files_within_Vim )

