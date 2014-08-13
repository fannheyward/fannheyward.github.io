---
layout: post
title: "英文ubuntu使用中文输入法"
---

只用过scim，编辑 `/etc/gtk-2.0/gtk.immodules`(如果存在的话) 或者 `/usr/lib/gtk-2.0/2.10.0/immodule-files.d/libgtk2.0-0.immodules` 文件，在xim 的 local 增加 en 也就是说：

`"xim" "X Input Method" "gtk20" "/usr/share/locale" "ko:ja:th:zh"` 改成：

`"xim" "X Input Method" "gtk20" "/usr/share/locale" "en:ko:ja:th:zh"`

保存退出，重启。
