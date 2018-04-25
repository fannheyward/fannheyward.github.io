---
layout: post
title: 通过 Debian Snapshot 安装旧版本包
date: 2018-03-29 11:32:07 +0800
---

某个项目需要 PHP 5.3 支持，通过 APT 没办法直接安装，编译安装又是一大堆依赖，最后通过 Debian Snapshot 解决。

1. 在 [http://snapshot.debian.org/](http://snapshot.debian.org/) 搜索需要的包, 比如 `php5`
2. Got `http://snapshot.debian.org/archive/debian-ports/20120225T023111Z/pool-m68k/main/p/php5/`
3. 添加到 `source.list`:

```
deb http://snapshot.debian.org/archive/debian/20120225T023111Z/ unstable main
deb-src http://snapshot.debian.org/archive/debian/20120225T023111Z/ unstable main
```

4. `apt-get -o Acquire::Check-Valid-Until=false update`
5. `apt-get install php5=5.3.10-2 php5-fpm php5-cgi`, done.