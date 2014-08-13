---
layout: post
title: "Vimperator使用小记"
---

小记一些 Vimperator 快捷键:

1. **esc**，当快捷键无效时候大部分是因为切换到了命令模式，esc返回正常模式；
2. **tab**，善用tab补全；
3. **o/t**，当前/新标签打开页面；
4. **Shift+h/l**，后退/前进，一般来说后退用的比较多；
5. **u**，undo，撤销关闭的标签；
6. **d**，关闭当前页面；
7. **r/R**，刷新/强制刷新当前页面；
8. **/**，当前页面查找，回车后n标记下一个关键字，N标记上一个关键字；
9. **y/Y**，复制当前标签页url/复制选中的文字；
10. **gg/G**，跳转到页面顶端/底端；
11. **p/P**，粘帖并打开当前剪贴板里的url地址，小写当前标签打开，大写新标签打开；
12. **gf**，查看页面源代码；
13. **f**，进入QuickHint modo，用的不多；
14. **:pref**, 打开Fx opinion对话框；
15. **:addons**，扩展列表，同样可以tab补全；
16. **:restart**，重启Fx；

来一张 vimperator 的快捷键列表，基本上常用的都有了。

![](http://lh4.ggpht.com/_vYr4JQreqXA/SauAFex3XyI/AAAAAAAAAvk/zMUENFZlZ5U/s600/vimperator.jpg)

vimperator 同样有类似 vim 的配置文件，`_vimperatorrc`，保存到当前系统用户目录下即可，vista 是 C:\Users\Heyward。 我的 `_vimperatorrc`:

```
"默认显示菜单栏，工具栏，书签栏；隐藏任务栏；
:set guioptions=b

"解决vimperator与Google reader跟gmail快捷键冲突，自动PASS THROUGH状态
autocmd LocationChange .* :js modes.passAllKeys = /mail.google.com/.test(buffer.URL) || /google.com\/reader\//.test(buffer.URL)

:imap <C-v> <S-Ins> "粘帖键映射
```

vimperator 看似很复杂，不过上手后就发现会有多么高效，推荐 Fx 必备扩展。
