---
layout: post
title: "git cherry-pick"
date: 2013-10-26 21:38
---

> git-cherry-pick - Apply the changes introduced by some existing commits.

实际开发中会有这种情况：同时存在 v1、v2 两个分支，且不可合并。然后发现两个分支都存在某 bug，在 v1 中修复，需要合并到 v2，要么手动修改，或者用 git cherry-pick:

```sh
git cherry-pick 0ba264a1e666bacc
```

