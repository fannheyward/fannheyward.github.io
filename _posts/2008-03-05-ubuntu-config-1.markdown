---
layout: post
title: "ubuntu个人配置（一）"
---

1、首先解决的是上网问题，上网搞不定基本上后面的都干不了。学校的锐捷上网上网认证解决：

mystar认证：两个文件解压到个人目录里面，这样方便点。然后文档打开 mystar.conf，修改用户名、密码。在网络连接里面设置静态IP地址还有DNS解析，然后再终端里输入：sudo ./mystar 就可以认证上网。

2、设置软件源

```
sudo cp /etc/apt/sources.list /etc/apt/sources.list_backup----备份当前源
gksu gedit /etc/apt/sources.list

#感觉官方那个速度已经很不错了，就没做大的更改，只加了科大跟CN99的源。

deb http://debian.ustc.edu.cn/ubuntu/ gutsy main multiverse restricted universe
deb http://debian.ustc.edu.cn/ubuntu/ gutsy-backports main multiverse restricted universe
deb http://debian.ustc.edu.cn/ubuntu/ gutsy-proposed main multiverse restricted universe
deb http://debian.ustc.edu.cn/ubuntu/ gutsy-security main multiverse restricted universe
deb http://debian.ustc.edu.cn/ubuntu/ gutsy-updates main multiverse restricted universe
deb-src http://debian.ustc.edu.cn/ubuntu/ gutsy main multiverse restricted universe
deb-src http://debian.ustc.edu.cn/ubuntu/ gutsy-backports main multiverse restricted universe
deb-src http://debian.ustc.edu.cn/ubuntu/ gutsy-proposed main multiverse restricted universe
deb-src http://debian.ustc.edu.cn/ubuntu/ gutsy-security main multiverse restricted universe
deb-src http://debian.ustc.edu.cn/ubuntu/ gutsy-updates main multiverse restricted univers</pre>

deb http://ubuntu.cn99.com/ubuntu/ gutsy main restricted universe multiverse
deb http://ubuntu.cn99.com/ubuntu/ gutsy-security main restricted universe multiverse
deb http://ubuntu.cn99.com/ubuntu/ gutsy-updates main restricted universe multiverse
deb http://ubuntu.cn99.com/ubuntu/ gutsy-proposed main restricted universe multiverse
deb http://ubuntu.cn99.com/ubuntu/ gutsy-backports main restricted universe multiverse
deb-src http://ubuntu.cn99.com/ubuntu/ gutsy main restricted universe multiverse
deb-src http://ubuntu.cn99.com/ubuntu/ gutsy-security main restricted universe multiverse
deb-src http://ubuntu.cn99.com/ubuntu/ gutsy-updates main restricted universe multiverse
deb-src http://ubuntu.cn99.com/ubuntu/ gutsy-proposed main restricted universe multiverse
deb-src http://ubuntu.cn99.com/ubuntu/ gutsy-backports main restricted universe multiverse

sudo apt-get update----更新源列表
sudo apt-get dist-upgrade----更新软件，可选
```

图形化的软件源设置里面，五项全选，选择中国官方源，去掉DVD软件仓。

3、语言设置
系统 - 系统管理 - 语言支持，在列表中的Chinese条目打勾，提示安装，默认语言修改为Chinese，确定。

4、右键菜单加入打开终端，相当方便这样 `sudo apt-get install nautilus-open-terminal`

5、多媒体环境配置

Mp3播放：Audacious `sudo apt-get install audacious`

电影播放：Mplayer以及解码器 `sudo apt-get install mplayer-fonts mplayer mplayer-skins w32codecs`

字符编码好像有bug，不能直接在文件浏览器中打开文件，修改配置文件 `sudo gedit /usr/share/applications/mplayer.desktop` 将其中的 `exec＝gmplayer %U` 改为 `exec＝gmplayer %f` 即可。
