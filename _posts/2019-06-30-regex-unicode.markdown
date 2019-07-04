---
layout: post
title: Regex Unicode Scripts
date: 2019-06-30 17:33:59 +0800
---

1. `\p{Han}` 匹配中文、日语文字，支持简繁体。
1. `\p{Common}` 匹配符号
1. `\p{Latin}` 匹配拉丁语系
1. 需要 grep perl 支持，即 `grep -P "\p{Han}"`，或者 `rg/ag`.

```sh
echo '中文/繁體/片仮名／かたかな／カタカナ/katakana' | rg "\p{Han}"   > 中文 繁體 片仮名
echo '中文@mail.com' | rg "\p{Common}"                                > @ .
echo '中文@mail.com' | rg "\p{Latin}"                                 > mail com
```

[Unicode Scripts](https://www.regular-expressions.info/unicode.html#script) for more.

