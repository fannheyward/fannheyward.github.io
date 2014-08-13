---
layout: post
title: "Compile and install SVN 1.7.2 on Mac"
date: 2012-01-09 18:25
---

Just a note for myself.

1. Download [svn-1.7.2.tar.gz](http://labs.renren.com/apache-mirror/subversion/subversion-1.7.2.tar.gz) source.
1. Run `./autogen.sh` to check the necessary components to build svn.
1. `./configure` then `make` and `sudo make install`.

All commands:

```
./autogen.sh
./configure --disable-debug --with-ssl --with-zlib=/usr --with-sqlite=/usr --disable-neon-version-check --disable-mod-activation --without-apache-libexecdir --without-berkeley-db --with-neon=/usr/local/Cellar/neon/0.29.6/
make
sudo make install
```

