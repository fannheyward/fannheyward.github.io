---
layout: post
title: XDG Base Directory
date: 2017-06-05 22:07:44 +0800
---

XDG 是 X Desktop Group 的简称，现在叫 [Freedesktop.org][1]，致力于推动 *nix 桌面环境的标准规范化。其中 [XDG Base Directory][2] 定义了文件配置基本目录：

* `$XDG_CONFIG_HOME` 是配置文件目录，默认 `$HOME/.config`
* `$XDG_DATA_HOME` 是用户文件的基本保存目录，默认 `$HOME/.local/share`
* `$XDG_DATA_DIRS` 定义 `$XDG_DATA_HOME` 以外的文件基础目录，是一个有序目录集合，默认 `/usr/local/share/:/usr/share/`
* `$XDG_CONFIG_DIRS` 同理，是扩展的配置文件目录，默认 `/etc/xdg`，需要注意的是目录顺序很重要，`$XDG_CONFIG_HOME` 优先级最高
* `$XDG_CACHE_HOME` 缓存目录，默认 `$HOME/.cache`
* `$XDG_RUNTIME_DIR` 指定非必需运行时文件保存目录

[Neovim][3] 支持 XDG Base Directory，配置文件是 `$HOME/.config/nvim/init.vim`，shada 文件在 `$HOME/.local/share/nvim`.

via [XDG Base Directory Specification][2]

[1]: https://zh.wikipedia.org/wiki/Freedesktop.org
[2]: https://standards.freedesktop.org/basedir-spec/basedir-spec-latest.html
[3]: https://github.com/neovim/neovim