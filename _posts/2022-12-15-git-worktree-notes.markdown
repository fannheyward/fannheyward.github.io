---
layout: post
title: Git Worktree Notes
date: 2022-12-15 23:10:18 +0800
---

`git worktree`，不切换 git 分支，又在多个分支同时工作。

- `git worktree list` list all worktree
- `git worktree add [-b <new-branch>] <path> [<commit-ish>]` create a worktree at path and checkout commit-ish into it
- `git worktree remove <worktree>` remove the special worktree
- `git worktree prune` prune dirty infos
