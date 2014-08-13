---
layout: post
title: "string.translate and string.maketrans"
---

string.translate( s, table[, deletechars])

> Delete all characters from *s* that are in *deletechars* (if present), and then translate the characters using *table*, which must be a 256-character string giving the translation for each character value, indexed by its ordinal.

string.maketrans(from, to)

> Return a translation table suitable for passing to translate(), that will map each character in from into the character at the same position in to; from and to must have the same length.

string.translate() 可以根据一个映射表将字符串里的字符替换成映射表对应的字符，比如映射表里面设定 a 对应 1，b 对应 2，c 对应 3，那么 `'abc'.translate` 对应的字符串就是 `'123'`.

string.maketrans() 就是用来生成 translate() 所需要的映射表，参数是两个相等的字符串，根据两个字符串对应的字符位置作成一个字符映射表。

