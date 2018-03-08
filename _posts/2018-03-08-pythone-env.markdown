---
layout: post
title: macOS Python env
date: 2018-03-08 10:15:31 +0800
---

```
brew install python
brew install python@2

python --version   // 2.7.14
pip --version      // /usr/local/lib/python2.7/site-packages

python3 --version  // 3.6.4
pip3 --version     // /usr/local/lib/python3.6/site-packages
```

多版本共存还可以用 [pyenv](https://github.com/pyenv/pyenv) 解决。

使用 [pipsi](https://github.com/mitsuhiko/pipsi) 安装 Python-base 工具，比如 ansible，httpie，pylint，yapf 等：

```
sudo /usr/bin/easy_install virtualenv
curl https://raw.githubusercontent.com/mitsuhiko/pipsi/master/get-pipsi.py | /usr/bin/python

pipsi install ansible
pipsi install pipenv
```

对于 Python 项目，通过 [pipenv](https://github.com/pypa/pipenv) 管理包依赖:

```
pipenv install requests
```
