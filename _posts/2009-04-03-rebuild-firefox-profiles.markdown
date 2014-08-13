---
layout: post
title: "重构firefox配置"
---

重构，这词够分量的。今天重构 Fx 配置一大原因就是最新的 vimperator 2.0 跟现在的插件有冲突，应该说是跟 TMP 冲突。其实挺早都想重构一下，因为现在使用的配置是 Fx 2.0 时候一直用到现在的配置，扩展是装了卸、卸了装，把配置弄的都很乱，最明显的就是 prefs.js 文件，最大时有500K+，虽然精简后50K左右，还是有一些乱七八糟的东西在里面，要知道 Fx 新装好也只不过几K而已。重构还有一个原因就是想精简一下扩展，自从用了 vimperator 后好多扩展功能都有重复，可以卸载掉一些。

1. 备份。丢失 Fx 配置文件是比较麻烦的事情，尤其是习惯了自己配好的 Fx 后，要经常的备份配置；
2. 新建配置文件，Fx 是支持多配置的，开始-运行-`firefox -p`，新建一个配置文件；
3. Fx 自身设置，也就是选项里面的一些设置，主要是浏览历史，一般保存三天就足够了，太多太大很拖累 Fx 速度；
4. 放弃了 TMP。TMP 真的是一个非常棒的扩展，有非常丰富的功能，曾经也是我必装的扩展之一。 不过 TMP 的兼容性真不怎么的，经常跟别的扩展有冲突。其实 Fx3 标签页功能相对于 Fx2 时候增强不少了，再加上现在用 vimperattor，没必要使用这么庞大的 TMP 了，换用 Tab-mix-lite-ce，基本标签功能都有，也很轻巧，只有27K，TMP 可是有378K的大个头。
5. 精简扩展，从29个精简到17个，使用不是很多的都给去掉了，扩展太多带来的最大问题就是内存占用。之前 Fx 内存占用一般都在150M+，高峰时候过200M也很频繁。下午重构之后用到现在，没有超过100M，当然，才一下午而已；
6. `about:config` 修改设置。参考了以前的一些设置，改动不大，默认状态已经很不错了。

现在用的扩展：

- Adblock Plus
- Add to Search Bar//添加了几个搜索后卸掉；
- All-in-One Sidebar
- Copy Link Name
- Custom Buttons//没有用2版，1版的足够，主要添加了隐藏标题栏和右键自动弹出；
- DownThemAll!
- Easy DragToGo
- Firebug
- Flashblock
- FlashGot
- Greasemonkey
- Multiproxy Switch
- Text Link
- Ubiquity
- Vimperator

vimperator 自动翻页配置：

```
:set nextpattern=\s下一页|下一张|下一篇|下页|后页\s,^\bnext\b,\bnext\b
:set previouspattern=\s上一页|上一张|上一篇|上页|前页\s,^\bprev|previous\b
```

