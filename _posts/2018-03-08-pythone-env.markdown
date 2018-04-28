---
layout: post
title: macOS Python env
date: 2018-03-08 10:15:31 +0800
---

```
brew install python

which python  // /usr/bin/python
which python3 // /usr/local/bin/python3

sudo easy_install neovim
pip3 install --upgrade neovim
```

多版本共存还可以用 [pyenv](https://github.com/pyenv/pyenv) 解决。

使用 [pipsi](https://github.com/mitsuhiko/pipsi) 安装 Python-base 工具，比如 ansible，httpie，pylint，yapf 等：

```
sudo /usr/bin/easy_install virtualenv
curl https://raw.githubusercontent.com/mitsuhiko/pipsi/master/get-pipsi.py | /usr/bin/python

pipsi install 'python-language-server[all]'
pipsi install pipenv
```

对于 Python 项目，通过 [pipenv](https://github.com/pypa/pipenv) 管理包依赖:

```
pipenv install --python 3.6.5
pipenv install requests

pipenv shell
```

设置 VSCode 支持 pipenv:

```
{
    "python.pythonPath": "/Users/fannheyward/.virtualenvs/tools-CDG8SfKX/bin/python"
}
```
