---
layout: post
title: "Docker 笔记"
date: 2014-02-11 23:06
---

所有 docker 操作都需要 root 权限，需要加 sudo:

```
docker search gitlab
```
搜索服务镜像(image)，挑选有 **TRUSTED** 标示的，相对好一些。

```
docker pull NAME
```
下载相应镜像，由于 index.docker.io 被墙，需要梯子，下载会很慢。

```
docker build -t NAME .
```
在当前目录根据 Dockerfile 构建容器，`--rm` 自动删除 build 中间状态的容器。

```
docker run -i -t -p 8080:80 NAME
```
运行一个 Container，支持的参数:

* `-d` Detached 或者 daemon mode，后台运行。
* `-i -t` 开一个 tty 终端，保持交互模式，这两个一般共同使用。
* `-e` 设置环境变量参数，参考 [Install GitLab With Docker][1]。
* `-p [host_port]:[container_port]` 映射 HOST 端口到容器，方便外部访问容器内服务，host_port 可以省略，省略表示把 container_port 映射到一个动态端口。
* `-v [host-path]:[container-path]` 把 HOST 文件夹挂载到 Container 用以保存数据。
* `--rm` 自动删除已运行存在的相同 IMAGE 的容器。

```
docker attach --sig-proxy=false CONTAINER
```
attach 后台运行的容器，加上 `--sig-proxy=false` 参数可以通过 `Ctrl+C` detach，不然一旦 attach 就没办法取消。

```
docker commit --run='COMMAND' -m 'message' CONTAINER IMAGE:tag
```
登录容器做一些修改，退出到 HOST 保存修改到镜像，或者直接在 HOST 通过 `--run` 给正在运行的容器发送命令并保存到镜像。

```
docker stop/start/restart/kill/rm CONTAINER
```
停止、重启、杀死、删除容器。

```
docker ps -a -q
```
列出当前运行的容器，`-a` 会列出所有，包括已停止的，`-q` 只列出容器 ID。`docker ps -a -q | xargs docker rm` 可以删除所有未运行的容器。

```
docker logs -f CONTAINER
```
查看容器运行日志。

```
docker cp CONTAINER:/PATH HOSTPATH
```
拷贝容器内文件或文件夹到 HOST。目前只支持 Container 到 HOST 的单向拷贝，HOST 到 Container 可以通过 insert 命令。

```
docker insert IMAGE URL PATH
```
将 URL 文件内容写入相应 PATH，这个操作不修改原来 IMAGE 内容，而是再它的基础上新建一个 IMAGE.

```
docker images
```
列出已安装的镜像。可以通过 `docker rmi IMAGE` 删除镜像。

```
docker inspect CONTAINER | grep IPAddress
```
检查容器配置，包含内部 IP 等信息。

更多可参考 [Docker 文档][2]。

[1]:https://fann.im/blog/2014/02/10/gitlab-with-docker/
[2]:http://docs.docker.io/en/latest/

