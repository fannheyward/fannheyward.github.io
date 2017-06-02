---
layout: post
title: pushd / popd
date: 2017-05-28 11:09:15 +0800
---

`cd -` can goto last directory that you just leave, `-` means `$OLDPWD`. This only support one directory.

`pushd / popd / dirs` works on multiple directories, as a directory stack:

```
pushd [dir1] # add dir to stack
popd [dir1] # pop dir from stack
dirs # list stack
dirs -c # cleanup stack
```
