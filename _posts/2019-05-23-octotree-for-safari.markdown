---
layout: post
title: Octotree for Safari
date: 2019-05-23 15:32:03 +0800
---

**From Safari 13, you can only install extension from Mac App Store.**

----

```sh
brew install node@10
export PATH="/usr/local/opt/node@10/bin:$PATH"
# make sure node and npm is v10, cause octotree used gulp 3, which is not working with node 12.

git clone https://github.com/ovity/octotree.git ~/src/octotree
cd ~/src/octotree
git checkout master

npm i
npm install natives@1.1.6
npm run dist
# extension locate in ~/src/octotree/tmp/safari/octotree.safariextension/

cd ~/Library/Safari/Extensions
mv ~/src/octotree/tmp/safari/octotree.safariextension .
```

1. Enable `Developer` menu in Safari
2. `Developer - Show Extension Builder`
3. Add octotree.safariextension and Run

