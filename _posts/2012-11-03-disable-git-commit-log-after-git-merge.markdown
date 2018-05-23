---
layout: post
title: "禁用 git merge 完成后的提交说明"
date: 2012-11-03 20:03
---

Git 1.7.10+ 版本对 `git merge` 做了一个改动，就是 merge 成功后会自动打开编辑器等待输入 merge 提交说明，而之前版本是自动完成这个 log。Linus 大神说之前的做法其实是一个设计失误 [via](http://thread.gmane.org/gmane.linux.kernel/1191100/focus=181362)：

> we never even fire up the editor by default for a "git merge", but we do for a "git commit". That was a design mistake, and it means that if you want to actually add a note to a merge, you have to do extra work.

然而大部分时候我们 merge 的时候都不太会去手动添加 merge log，那么这个功能就是个干扰，每次都要手动去关掉编辑器。[这里](https://raw.github.com/gitster/git/master/Documentation/RelNotes/1.7.10.txt) 找到一个解决方案：

```
export GIT_MERGE_AUTOEDIT=no
```

Done.

