---
layout: post
title: gnutls_handshake() failed: Error in the pull function
date: 2023-10-31 17:30:48 +0800
---

The error means that Git can't establish a secure connection to the remote repository. Your version of Git uses the GnuTLS library to set up TLS (encrypted) connections, try building Git against a version of libcurl using OpenSSL.

```sh
sudo apt-get update
sudo apt-get install curl build-essential fakeroot dpkg-dev libcurl4-openssl-dev
sudo apt-get build-dep git
mkdir ~/git-openssl
cd ~/git-openssl
apt-get source git
cd git-2.17.1/

vim debain/control
# :%s/libcurl4-gnutls-dev/libcurl4-openssl-dev/g

vim debian/rules
# comment TEST =test to ignore test in building

sudo dpkg-buildpackage -rfakeroot -b -uc -us
sudo dpkg -i ../git_2.17.1-1ubuntu0.4_amd64.deb
```

- <https://stackoverflow.com/q/60262230/380774>
- <https://blog.csdn.net/laviolette/article/details/80306178>
