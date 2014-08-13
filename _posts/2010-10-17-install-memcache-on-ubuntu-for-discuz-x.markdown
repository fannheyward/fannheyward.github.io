---
layout: post
title: "Ubuntu 安装 Memcache 支持 Discuz X"
---

安装 Memcached 和 php-memcache 模块：

> `sudo apt-get install memcached php5-memcache`

默认安装后会自动在 php.ini 添加启用 extension=memcache.so

运行 memcached(-d启动守护进程，-m指定memcached内存)：

> `memcached -d -u root -m 64 -l 127.0.0.1 -p 11211`

**重启 apache**：

> `sudo /etc/init.d/apache2 restart` or `sudo service apache2 restart`

为安全起见可以先测试一下 memcache。

配置 Discuz! X 使用 Memcacha 内存优化，修改 config/config_global.php

> `$_config['memory']['memcache']['server'] = '127.0.0.1';`

Done.

