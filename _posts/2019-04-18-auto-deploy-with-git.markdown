---
layout: post
title: Deployment with git
date: 2019-04-18 15:25:16 +0800
---

```
#!/bin/sh

set -uex

PATH=$PATH:$HOME/bin
export PATH

DIR=/home/serv/project
cd ${DIR}

REV1=$(git rev-parse --verify HEAD)
git pull origin master
REV2=$(git rev-parse --verify HEAD)
test ${REV1} = ${REV2} && echo "Already updated" && exit

make
test $? -ne 0 && echo "make error" && exit

kill -HUP $(cat logs/run.pid)
```

主要是通过 `git rev-parse --verify HEAD` 来获取当前 rev hash，前后对比是否一致，以此来决定是否继续。