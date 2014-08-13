---
layout: post
title: "PHP 中 require() 和 include() 的区别"
---

require() 和 include() 的功能都是包含并运行指定文件。寻找包含文件的顺序先是在当前工作目录的相对的 include_path 下寻找，然后是当前运行脚本所在目录相对的 include_path 下寻找。

两者的不同之处只有如何处理包含、运行文件失败：include() 产生一个警告，而 require() 会导致一个致命的错误。如果想在遇到丢失文件时停止处理页面就用 require()。

