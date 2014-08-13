---
layout: post
title: "Delphi Format function"
---

function Format ( Const Formatting  : string; Const Data  : array of const ) : string;

> Rich formatting of numbers and text into a string.

Const **Formatting** 参数是一个格式字符串，用于格式化 Const **Data** 数组里面的值。

Formatting 参数的指令格式以"%"开始,以 Type 结束，Type 表示一个具体的数据类型。中间是用来格式化 Type 类型的指令字符，是可选的。

> `%[Index:][-][Width][.Precision]Type`

Type 的类型包括：

d = Decimal (integer)，整型值；

u = Unsigned decimal，无符号整型值，如果它对应的值是负的，则返回时是一个2的32次方减去这个绝对值的数。

> `Format('this is %u',[－2]);===>this is 4294967294`

f = Fixed，浮点数；

e = Scientific，科学记数法表示；

g = General，浮点型，会将值中多余无效的数去掉。

> `Format('this is %g',[02.200]);===>this is 2.2`

n = Number (floating)，浮点型，会将值转化为号码的形式（默认只表示到小数后两位）。

> `Format('this is %n',[4552.2176]);===>this is 4,552.22`

m = Money，钱币类型；

p = Pointer，指针类型，返回的值是指针的地址，以十六进制表示；

s = String，对应字符串类型；

x = Hexadecimal，必须是一个整形值，以十六进制的形式返回；

格式化 Type 的指令：

`[index:]` 指示 Const **Data** 中参数显示的顺序：

> `Format('this is %1:d %0:d',[12,13]);===>this is 13 12`

> `Format('%d %d %d %0:d %3:d', [1, 2, 3, 4]);===>1,2,3,1,4`

`[width]` 指定将被格式化的值占的宽度，默认右对齐，`[-]` 指定向左对齐：

> `Format('this is %4d',[12]);===>this is __12` （__下划线是不存在的，只是为了显示这里空了两格）

> `Format('this is %-4d',[12]);===>this is 12__`

`[.Precision]` 指定精度:

> `Format('this is %.7f',['1.1234]);===>this is 1.1234000`

