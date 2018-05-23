---
layout: post
title: "Git 新建无历史记录分支"
date: 2013-08-23 16:59
---

```
git checkout --orphan NEW_BRANCH_NAME
```

在代码开源分发等时候往往需要去掉不必要的历史记录，这种新分支方式会很方便。

