---
layout: post
title: "ubuntu个人配置（三）"
---

1. 清楚安装软件后的垃圾 `dpkg -l |grep ^rc|awk '{print $2}' |tr ['\n'] ['']|sudo xargs dpkg -P`
2. 修改默认启动 `sudo gedit /boot/grub/menu.lst` 修改中间的 default 4//从第0行开始。
3. 文泉驿字体 xfonts-wqy 压缩的pcf格式，而pcf.gz格式的字体，特别是在显示中文这样的大字符集时，系统渲染速度比较慢。把字体文件解压可以大大提高显示速度，方法为

```
cd /usr/share/doc/xfonts-wqy
sudo gunzip wenquanyi*pcf.gz
sudo rm fonts.dir fonts.scale fonts.cache*
sudo mkfontdir .
sudo cp fonts.dir fonts.scale
sudo fc-cache -fv
```

