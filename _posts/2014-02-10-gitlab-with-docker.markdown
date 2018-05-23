---
layout: post
title: "Install GitLab with Docker"
date: 2014-02-10 23:38
---

[GitLab][1] 是个非常不错的 GitHub clone，很适合团队自建 git 服务器。但是由于 GitLab 是个 RoR 应用，加上 gitlab-shell 的权限要求等等，GitLab 的部署甚是麻烦。

[Docker][2] 简单说就是基于 LXC 的类 VM 方案，当然比 Virtual Box 等 VM 要高效、省资源，应用和依赖打包成一个容器，很方便部署。

用 Docker 部署 GitLab 首先要找一个可用的镜像(image)：

```
sudo docker search gitlab
```

选用 [sameersbn/gitlab][3]，原因是更新较快，文档详细，支持 `-e` 设置环境变量，基本上不需要修改安装配置。

省事的话直接 `sudo docker pull sameersbn/gitlab` 即可，或者:

```
git clone https://github.com/sameersbn/docker-gitlab.git
cd docker-gitlab
添加 HOST /root/.ssh/id_rsa.pub 到 authorized_keys，这样可以免密码从 HOST 登录 Container。
sudo docker build -t fannheyward/gitlab .
```

build 完成后启动:

```
sudo docker run -p 22:22 -d \
  -e "SMTP_USER=gitlab@host.com" -e "SMTP_PASS=password" \
  -e "GITLAB_EMAIL=gitlab@host.com" -e "GITLAB_SUPPORT=gitlab@host.com" \
  -e "GITLAB_SIGNUP=true" \
  -e "GITLAB_HOST=gitlab.host.com" \
  -v /opt/gitlab/data:/home/git/data \
  -v /opt/gitlab/mysql:/var/lib/mysql \
  fannheyward/gitlab
```

* `-e` 用来设置一些环境变量，最少要把 `GITLAB_HOST` 设置，不然所有项目的 git 地址为 `git@localhost`。
* `-v [host-path]:[container-path]` 用来把 HOST 文件夹挂载到 Container 用来保存数据，不然 Container 重启或者关停后数据就会丢失，前面是 HOST 目录，后面是 Container 目录，不要写反。
* `-p 22:22` 是把 Container 的 22 端口映射到 HOST 22 端口，HOST 22 改为其他，这样 git ssh 操作的时候方便一些。

在 HOST 上可以通过 `ssh 172.17.0.2` 登录 Container，IP 地址可以通过 `docker inspect c8c2997b9bc4|grep IPAddress` 获取。在 Container 里可以做任何修改，安装软件等，修改后在 HOST `sudo docker commit c8c2997b9bc4 fannheyward/gitlab:v1` 提交保存，这样重启 Container 不会丢失修改。

Done。数据备份和升级参考 [sameersbn/gitlab][3] 文档。


[1]:https://github.com/gitlabhq/gitlabhq
[2]:https://www.docker.io/
[3]:https://github.com/sameersbn/docker-gitlab

