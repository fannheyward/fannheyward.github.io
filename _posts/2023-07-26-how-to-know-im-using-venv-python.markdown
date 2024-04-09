---
layout: post
title: How to know I'm using venv Python
date: 2023-07-26 10:27:21 +0800
---

Several ways to know if the Python interpreter is running inside a virtual environment:

- Solution 1: use `sys.prefix` that points to the Python directory
- Solution 2 (the better way): `VIRTUAL_ENV` environment variable. When a virtual environment is activated, this is set to the venv’s directory, otherwise it's None.

```python
import os
print(os.environ.get('VIRTUAL_ENV'))
```
