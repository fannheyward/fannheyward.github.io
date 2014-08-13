---
layout: post
title: "Heybot - My Gtalk Hubot"
date: 2012-09-09 21:31
categories: [Share]
---

Github 是非常好的学习地方，Github Inc 这家公司也很有意思，一帮 Geek 程序员做了很多很好玩的东西，比如 [Hubot][1], [Play][2]。Hubot 是一个机器人，可以音乐、搜索、搞怪逗乐等，在 Github 内部他们还用 Hubot 部署代码。开源版本的 Hubot 目前不支持代码部署等高级命令，不过可以自己写脚本（CoffeeScript）进行扩展。

Hubot 原生支持 Campfire、Shell 作接口，通过 npm 扩展可以用 Gtalk、IRC 等等。在 Heroku 上部署了一个用 Gtalk 作接口的 Heybot（Heyward's Hubot），简单纪录一下。

```
wget https://github.com/downloads/github/hubot/hubot-2.3.2.tar.gz
tar xzvf hubot-2.3.2.tar.gz
cd hubot

vim Procfile 修改 adapter：
    app: bin/hubot -a gtalk -n Hubot
vim package.json 添加 hubot-gtalk 到 dependencies：
    "hubot-gtalk": ">= 0.0.1",

git init
git add *
git commit -m "init"

heroku apps:create
git push heroku master
heroku ps:scale app=1
heroku addons:add redistogo:nano
heroku config:add HUBOT_GTALK_USERNAME="xxx" HUBOT_GTALK_PASSWORD="xxx"
heroku ps:restart
```

添加 Gtalk 好友，`hubot help` 可以查看目前支持的命令。

[1]:https://github.com/github/hubot
[2]:https://github.com/play/play

