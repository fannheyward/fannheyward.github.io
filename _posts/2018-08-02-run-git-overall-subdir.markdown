---
layout: post
title: 在所有子目录下执行 git
date: 2018-08-02 18:20:20 +0800
---

```
git config --global alias.all '!f() { ls -R -d */.git | sed 's,\/.git,,' | xargs -P10 -I{} git -C {} $1; }; f'

git all pull
```