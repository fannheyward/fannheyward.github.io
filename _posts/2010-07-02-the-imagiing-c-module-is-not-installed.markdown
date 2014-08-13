---
layout: post
title: "The _imaging C module is not installed"
---

Download jpeglib.

```
cd jpeg-7
sudo make clean
sudo CC="gcc -arch i386" ./configure --enable-shared --enable-static
sudo make
sudo make install
```

Download PIL.

```
sudo rm -Rf build
//Edit JPEG_ROOT = libinclude("/usr/local") in setup.py
sudo python setup.py build
sudo python setup.py install
```

