---
layout: post
title: "ubuntu个人配置（二）"
---

1. `/var/cache/apt/archieve` 下的都是软件的安装缓存，可以直接删除，或者用命令 `sudo apt-get autoclean`（只删除低版本的deb包），`sudo apt-get clean`（全部删除）。为了以后重装系统方便，可以将这些deb包保存到其他地方。

2. 软件源码编译安装 `./configure && make && sudo make install`

3. Ubuntu7.10 里面火狐假死以及占资源100%解决 `sudo gedit /usr/lib/firefox/firefox` 头部添加 `export MOZ_DISABLE_PANGO=1` 同时禁用ubuntu加的扩展: ubufox, 加装 flashblock 插件。

4. 无法重命名解决 `sudo gedit /etc/X11/xinit/xinput.d/scim`, 将文件中的 `GTK_IM_MODULE=xim QT_IM_MODULE=xim` xim 改为 scim，保存退出

5. ubuntu 备份当前所装软件，生成当前安装软件的内容列表 `dpkg --get-selections | grep -v deinstall > ubuntu.files` 重装后，配好 sources.list 后 `dpkg --set-selections < ubuntu.files` 按提示安装。

