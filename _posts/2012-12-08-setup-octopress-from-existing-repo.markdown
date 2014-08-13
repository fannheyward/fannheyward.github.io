---
layout: post
title: "Setup Octopress from existing repo"
date: 2012-12-08 23:34
categories: [Share]
---

从已有的 Octopress repository 重新配置 GitHub Pages 托管博客，比如换了电脑却没有备份原来的设置。要求 source 分支已 push。

```
git clone git@github.com:fannheyward/fannheyward.github.com.git blog
cd blog
git checkout --track origin/source
# setup ruby with rbevn or rvm
gem install bundler
bundle install
rake gen_deploy # in order to create _deploy dir
# setup blog branch
cd _deploy/
git init
git add .
git commit -m "new setup."
git remote add origin git@github.com:fannheyward/fannheyward.github.com.git
cd ..
rake deploy
```

其实就是做了一系列的 git 操作，设置 repo，branch 等，熟悉 git 很容易搞定。

