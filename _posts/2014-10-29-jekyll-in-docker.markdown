---
layout: post
title: "Jekyll in Docker"
date: 2014-10-29 15:16:50 +0800
---

最近[又捡起][0] Docker，打算用在团队内做一些 CI 工作。拿 Jekyll 练手，记一下笔记：

```
FROM ruby:2.1.3
MAINTAINER Heyward Fann <fannheyward@gmail.com>

RUN gem install github-pages
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

ENV NODE_VERSION 0.10.33
RUN curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
        && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
        && rm "node-v$NODE_VERSION-linux-x64.tar.gz"

WORKDIR /blog
EXPOSE 4000

ENTRYPOINT ["jekyll"]
CMD ["serve"]
```

Then:

1. `docker build --rm=true --tag="blog:0.0.2" .`
1. `docker run --rm -p 4000:4000 -v /ABSOLUTE/PATH:/blog blog:0.0.2`
1. `boot2docker ip` then `http://IP:4000`
1. OR `docker run --rm -v /ABSOLUTE/PATH:/blog blog:0.0.2 build`

笔记：

1. Base image 建议选用 `debian:wheezy`，如果需要编译环境可用 `buildpack-deps:wheezy|jessie`，相对 Ubuntu image 要小很多。
2. 尽量不安装编译环境，直接包管理工具或二进制文件，注意清理缓存文件。
3. 尽量少的 `RUN` 命令，减少 layers 数量，尽可能在一个 RUN 组合完成多个操作，比如 [ruby]。
4. 配合 `.dockerignore` 忽略不需要的文件。
5. build 或 run 的时候加上 `--rm=true` 自动删除中间容器。
6. `CMD` 和 `ENTRYPOINT` 都是 `docker run` 的入口，只是在参数处理上不同。CMD 可以被 run 后面的命令替换，而 ENTRYPOINT 是把 run 后面的作为参数传入。
7. CMD 配合 ENTRYPOINT 一起用很不错，如果没有参数，执行的就是 ENTRYPOINT＋CMD 组合起来的功能，加上参数就会把 CMD 替换掉，执行另外的命令。
8. OS X 下用 `boot2docker` 要注意 IP 不是本机或 127.0.0.1，而是 `boot2docker ip`.
9. 如果是 Golang 二进制程序，完全可以构建一个空 image 执行，比如 [Building Docker Images for Static Go Binaries][4].

参考：

* [Dockerfile Best Practices][1]
* [Dockerfile Best Practices - take 2][2]
* [Building good docker images][3]
* [15 分钟掌握 15 个 Docker 小窍门][5]

----

就目前的情况，用 Docker 构建测试环境很方便，麻烦的是测试用例和测试脚本整理，小团队基本以业务为主，很少有时间或没有意识的去写测试用例，只是在完成具体业务后针对该功能进行测试，没法系统的进行测试，这个需要在后面工作中重视起来。

[ruby]:https://github.com/docker-library/ruby/blob/master/2.1/Dockerfile#L10
[0]:https://fann.im/blog/2014/02/11/docker-notes/
[1]:https://crosbymichael.com/dockerfile-best-practices.html
[2]:https://crosbymichael.com/dockerfile-best-practices-take-2.html
[3]:http://jonathan.bergknoff.com/journal/building-good-docker-images
[4]:https://medium.com/@kelseyhightower/optimizing-docker-images-for-static-binaries-b5696e26eb07
[5]:https://docker.cn/p/docker-15-tips/
