---
layout: post
title: "Vimperator个人配置(091111)"
---

```
"2009-11-11

"默认显示菜单栏，工具栏，书签栏；隐藏任务栏；
:set guioptions=nB

"键盘映射
map <S-Up> :set go=m<CR>
map <S-Down> :set go=<CR>
map <S-Left> :set go=T<CR>
map <S-Right> :set go=B<CR>
map <S-Home> :set go=mTB<CR>

"映射快捷键
map <S-F1> :tabopen https://mail.google.com/mail/#compose<ENTER>

noremap j <C-f>
noremap k <C-b>
noremap h gT

"自动PASS THROUGH状态
autocmd LocationChange . :js modes.passAllKeys = /mail.google.com/.test(buffer.URL) || /google.com\/reader\//.test(buffer.URL) || /docs.google.com/.test(buffer.URL) || /wave.google.com/.test(buffer.URL)

:imap <C-v> <S-Ins>

"自动翻页，[[和]]快捷键
:set nextpattern=\s下一页|下一张|下一篇|下页|后一页|后页\s,^\bnext\b,\bnext\b,\older\b,^>$,^(>>|»)$,^(>|»),(>|»)$,\bmore\b
:set previouspattern=\s上一页|上一张|上一篇|上页|前一页|前页\s*,^\bprev|previous\b,\bprev|previous\b,\newer\b^<$,^(<<|«)$,^(<|«),(<|«)$

"智能地址栏
:set complete=sl
```

