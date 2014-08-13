---
layout: post
title: "Git-flow 使用笔记"
date: 2012-03-12 16:09
categories: [Dev, Share]
---

[git-flow][1] 原理：[A successful Git branching model][2]，两篇不错的中文翻译： [Git开发管理之道][3]，[一个成功的Git分支模型][4]。

简单来说，git-flow 就是在 `git branch` `git tag`基础上封装出来的代码分支管理模型，把实际开发模拟成 `master` `develop` `feature` `release` `hotfix` `support` 几种场景，其中 `master` 对应发布上线，`develop` 对应开发，其他几个在不同的情况下出现。通过封装，git-flow 屏蔽了 `git branch` 等相对来说比较复杂生硬的命令(`git branch` 还是比较复杂的，尤其是在多分支情况下)，简单而且规范的解决了代码分支管理问题。

安装 git-flow:

```
brew install git-flow
```

在一个全新目录下构建 git-flow 模型：

```
➜ git flow init
Initialized empty Git repository in /Users/fannheyward/flowTest/.git/
No branches exist yet. Base branches must be created now.
Branch name for production releases: [master]
Branch name for "next release" development: [develop]

How to name your supporting branch prefixes?
Feature branches? [feature/]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]
Version tag prefix? []
```

或者在现有的版本库构建：

```
➜ git flow init
Which branch should be used for bringing forth production releases?
   - master
Branch name for production releases: [master]
Branch name for "next release" development: [develop]

How to name your supporting branch prefixes?
Feature branches? [feature/]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]
Version tag prefix? []
```

中间会询问生成的分支名，直接回车默认。这样一个 git-flow 分支模型就初始化完成。

使用场景一：新功能开发，代号 f1

```
➜ git flow feature start f1
Switched to a new branch 'feature/f1'

Summary of actions:
- A new branch 'feature/f1' was created, based on 'develop'
- You are now on branch 'feature/f1'

Now, start committing on your feature. When done, use:

     git flow feature finish f1

```

git-flow 从 `develop` 分支创建了一个新的分支 `feature/f1`，并自动切换到这个分支下面。然后就可以进行 f1 功能开发，中间可以多次的 `commit` 操作。当功能完成后：

```
➜ git flow feature finish f1
Switched to branch 'develop'
Already up-to-date.
Deleted branch feature/f1 (was 7bb5749).

Summary of actions:
- The feature branch 'feature/f1' was merged into 'develop'
- Feature branch 'feature/f1' has been removed
- You are now on branch 'develop'
```

`feature/f1` 分支的代码会被合并到 `develop` 里面，然后删除该分支，切换回 `develop`. 到此，新功能开发这个场景完毕。在 f1 功能开发中，如果 f1 未完成，同时功能 f2 要开始进行，也是可以的。

----

使用场景二：发布上线，代号 0.1

```
➜ git flow release start 0.1
Switched to a new branch 'release/0.1'

Summary of actions:
- A new branch 'release/0.1' was created, based on 'develop'
- You are now on branch 'release/0.1'

Follow-up actions:
- Bump the version number now!
- Start committing last-minute fixes in preparing your release
- When done, run:

     git flow release finish '0.1'
```

git-flow 从 `develop` 分支创建一个新的分支 `release/0.1`，并切换到该分支下，接下来要做的就是修改版本号等发布操作。完成后：

```
➜ git flow release finish 0.1
Switched to branch 'master'
Merge made by the 'recursive' strategy.
 f1      |    1 +
 version |    1 +
 2 files changed, 2 insertions(+)
 create mode 100644 f1
 create mode 100644 version
Switched to branch 'develop'
Merge made by the 'recursive' strategy.
 version |    1 +
 1 file changed, 1 insertion(+)
 create mode 100644 version
Deleted branch release/0.1 (was d77df80).

Summary of actions:
- Latest objects have been fetched from 'origin'
- Release branch has been merged into 'master'
- The release was tagged '0.1'
- Release branch has been back-merged into 'develop'
- Release branch 'release/0.1' has been deleted
```

git-flow 会依次切换到 `master` `develop` 下合并 `release/0.1` 里的修改，然后用 `git tag` 的给当次发布打上 tag 0.1，可以通过 `git tag` 查看所有 tag：

```
➜ git:(master) git tag
0.1
0.2
```

----

使用场景三：紧急 bug 修正，代号 bug1

```
➜ git flow hotfix start bug1
Switched to a new branch 'hotfix/bug1'

Summary of actions:
- A new branch 'hotfix/bug1' was created, based on 'master'
- You are now on branch 'hotfix/bug1'

Follow-up actions:
- Bump the version number now!
- Start committing your hot fixes
- When done, run:

     git flow hotfix finish 'bug1'
```

git-flow 从 `master` 分支创建一个新的分支 `hotfix/bug1`，并切换到该分支下。接下来要做的就是修复 bug，完成后：

```
➜ git flow hotfix finish bug1
Switched to branch 'master'
Merge made by the 'recursive' strategy.
 f1 |    2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
Switched to branch 'develop'
Merge made by the 'recursive' strategy.
 f1 |    2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
Deleted branch hotfix/bug1 (was aa3ca2e).

Summary of actions:
- Latest objects have been fetched from 'origin'
- Hotfix branch has been merged into 'master'
- The hotfix was tagged 'bug1'
- Hotfix branch has been back-merged into 'develop'
- Hotfix branch 'hotfix/bug1' has been deleted
```

git-flow 会依次切换到 `master` `develop` 分支下合并 `hotfix/bug1`，然后删掉 `hotfix/bug1`。到此，hotfix 完成。

git-flow 的 `feature` `release` 都是从 `develop` 分支创建，`hotfix` `support` 都是从 `master` 分支创建。




[1]:https://github.com/nvie/gitflow/
[2]:http://nvie.com/posts/a-successful-git-branching-model/
[3]:http://blog.leezhong.com/translate/2010/10/30/a-successful-git-branch.html
[4]:http://www.juvenxu.com/2010/11/28/a-successful-git-branching-model/
