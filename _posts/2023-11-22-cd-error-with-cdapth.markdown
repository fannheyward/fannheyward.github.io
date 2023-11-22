---
layout: post
title: cd error with CDAPTH
date: 2023-11-22 10:36:20 +0800
---

I've set `$CDPATH` in zsh for quick directories switching. But this bring some issues with `make` or `npm run`:

`/bin/sh: line 0: cd: src: No such file or directory`

`cd` wants to change some directory but uses `$CDPATH` first to find. Add `.` to `$CDPATH` to fix this:

```sh
export CDPATH=.:$HOME/src
```
