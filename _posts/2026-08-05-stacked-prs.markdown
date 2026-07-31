---
layout: post
title: Stacked PRs
date: 2026-08-05 16:02:18 +0800
---

Stacked PRs 核心是把一个大功能拆成多个**有序、依赖关系清晰**的小 PR 的工作流。每个 PR 的 base 是它下面那一层的分支，最终整条链落到 `main`。

```txt
main
  └── PR1（auth-layer）           ← 底层
        └── PR2（api-endpoints）
              └── PR3（frontend） ← 顶层
```

因为每个 PR 只展示自己的 diff，评审的是更小颗粒更聚焦的变更；当下层 PR 还在 review 时，可以立刻在它上面继续写下一层，保持开发快节奏，尤其是 Agent Coding。

## `gh stack` 实践

```bash
gh extension install github/gh-stack
```

| 命令 | 作用 |
| ------ | ------ |
| `gh stack init [branch]` | 初始化，创建第一层分支 |
| `gh stack add <branch>` | 在当前层之上新建下一层 |
| `gh stack submit` | 推送所有分支 + 创建/更新 PR，并自动把它们链接成 Stack |
| `gh stack push` | 只推送分支（`--force-with-lease`） |
| `gh stack sync` | 一键：fetch + rebase + push + 更新 PR 状态 |
| `gh stack rebase` | 级联 rebase（处理下层变更或 squash merge 后的情况） |
| `gh stack up / down / top / bottom` | 在栈的各层之间切换 |
| `gh stack modify` | 调整栈顺序 |

典型流程：

```bash
gh stack init auth-layer
# 写代码 → commit
gh stack add api-routes
# 写代码 → commit
gh stack add frontend
# 写代码 → commit
gh stack view            # 查看整条栈
gh stack submit          # 创建整条栈的 PR
# 之后有修改时
gh stack sync            # 或单独用 rebase + push
```

<https://github.com/github/gh-stack>
