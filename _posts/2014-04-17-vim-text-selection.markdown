---
layout: post
title: "Vim 文本选择范围"
date: 2014-04-17 22:34:31 +0800
categories: [Dev]
---

Vim 文本选择时可以用 `a` `i` 指定选择范围。`a` 代表一个整体(block)，`i` 代表 inner。比如：

`vaw` 包括单词和单词后的空格，`viw` 只选中单词。

`vat` - select a tag block, 包括 `<tag></tag>` 本身，`vit` - select inner tag，只选择 `<tag></tag>` 包起来的部分。

`vab` 选中包括 `()` 在内的文本，`vib` 不包括 `()` 自身，等同 `va(` `va)`, `vi(` `vi)`.

`vaB` 选中包括 `{}` 在内的文本，`viB` 不包括 `{}` 本身，等同 `va{` `va}`, `vi{` `vi}`, 类似有 `va[` `vi[`。

`vip|vis` 选中一段落文字，vip = visual inner paragraph. vis = inner sentence.

将 `v` 换为 `d` 是就变成了删除操作，删除范围同上。

查看帮助 `:help v_<whatever>`.

