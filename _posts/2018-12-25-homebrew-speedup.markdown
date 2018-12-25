---
layout: post
title: Homebrew Speedup
date: 2018-12-25 14:49:03 +0800
---

通过修改 Homebrew git repo 来加速：

```bash
cd "$(brew --repo)"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
// 中科大 git remote set-url origin https://mirrors.ustc.edu.cn/brew.git

cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
// 中科大 git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git

// homebrew-cask
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-cask"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git

// homebrew-bottles
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles
// export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles
// export HOMEBREW_BOTTLE_DOMAIN=http://7xkcej.dl1.z0.glb.clouddn.com
```

重置为官方源：

```bash
cd "$(brew --repo)"
git remote set-url origin https://github.com/Homebrew/brew.git

cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://github.com/Homebrew/homebrew-core

cd "$(brew --repo)/Library/Taps/homebrew/homebrew-cask"
git remote set-url origin https://github.com/Homebrew/homebrew-cask
```

