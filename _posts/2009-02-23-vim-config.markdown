---
layout: post
title: "配置Vim"
---
1. 添加ctags、taglist插件。官网下载这两个插件。taglist解压后合并到 `$VIM/vimfiles` 下doc和plugin目录，ctags.exe单文件放在vim安装目录下
2. ctags使用：源文件目录下cmd中运行 `ctags –R`，会在源文件目录下生成一个tags文件.
3. taglist使用很简单，常用的命令有 `:Tlist，ctr+]，ctr+o`。
4. 添加SearchComplete.vim插件，很小巧，功能就是搜索时候支持Tab补全关键字。

插件就先这么几个，慢慢的用了再添加。然后一个主要的就是 `_vimrc` 配置文件，这个更是要慢慢摸索，把现在的贴出来先：

```
" 自动载入_vimrc配置文件
autocmd! bufwritepost D:\Program Files\Vim_vimrc
" 不同中文编码显示
set encoding=utf-8
set fileencodings=utf-8,gbk,chinese,latin-1
if has("win32")
    set fileencoding=chinese
else
    set fileencoding=utf-8
endif
language message zh_CN.utf-8
" 默认目录
cd E:\Vim
set backupdir=E:\Vim\Backup
" 显示行号
set number
" 禁用swf交换文件
setlocal noswapfile
" 使用中文帮助文档
set helplang=cn
" 自动缩进，tab缩进
set autoindent        "always set autoindenting on
set smartindent       "set smart indent
set smarttab          "use tabs at the start of a line, spaces elsewhere
set expandtab
set tabstop=4
set shiftwidth=4
" 自动匹配括号
set showmatch
set mat=2
" 状态栏显示
set statusline=%F%m%r%h%w\ [TYPE=%Y]\ [POS=%04l,%04v][%p%%]\ [LEN=%L]
set laststatus=2 " always show the status line
" 侦测文件类型
filetype on
" 启用语法高亮
syntax on
" smartcase，搜索时默认不区分大小写，只有搜索关键字中出现一个大字母时才区分大小写
set ignorecase smartcase
```

最后一点，关于vim插件安装位置的问题，滇狐大侠[这篇文章](http://edyfox.codecarver.org/html/vimpluginspath.html)里有很详细的解释。我的方法，$HOME目录不装，牵扯到系统重装恢复，比较麻烦；$VIMRUNTIME目录尽量不装，这里面是发行版自带的插件等，升级vim时候可能会覆盖掉；自己安装的插件、文档等全部放在$VIM/vimfiles目录下，这样既便于管理又安全。

趁着毕业设计把以前许多想做的但又偷懒没做的拿起来，下一个，版本控制，做项目的必备啊。

