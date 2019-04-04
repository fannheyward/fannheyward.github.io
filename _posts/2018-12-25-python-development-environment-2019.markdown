---
layout: post
title: Python Development Environment 2019
date: 2018-12-25 11:41:14 +0800
---

> macOS

1. `brew install python` to install python 3
2. `python3 -m venv .venv` or `virtualenv -p $(which python3) .venv`
3. `source .venv/bin/activate`
4. `pip install 'python-language-server[all]'` to install pyls, will switch to MSPyls.
5. coding
6. `deactivate` to leave

No more pyenv, pipenv, use pipsi to install utils written in Python.
