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

在功能开发 `feature/x` 过程中，突发紧急问题修复，通常可以通过 `git stash` 来临时保存当前修改，但这种方式容易造成混乱，推荐使用 `git worktree`，更为清晰：

```sh
# 从 master 分支创建一个临时工作区用于 hotfix
$ git worktree add -b emergency-fix ../temp master
$ pushd ../temp
# ... hack hack hack ...
$ git commit -a -m 'emergency fix for boss'
$ popd
$ git worktree remove ../temp
```

AI Vibe Coding 场景，可以通过 worktree 创建多个不同工作区，使用 Claude Code/Gemini CLI/OpenAI Codex/AMP 等多个工具进行，或者自己在主工作区进行 tasks 安排，创建 A 工作区做 task1，B 工作区做 task2。
