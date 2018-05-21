---
layout: post
title: "平滑升级 Nginx"
date: 2014-03-21 17:19:35 +0800
categories: [Dev]
---

Nginx 可以在不中断服务的情况下平滑升级，很是方便。

1. 安装新版 Nginx，如果旧版本是编译安装可以通过 `nginx -V` 查看编译参数。默认会安装在同一目录，旧版本重命名为 nginx.old。

2. `kill -USR2 old_nginx.pid`，old_nginx.pid 会被重命名为 nginx.pid.oldbin，然后用新版 nginx 启动全新 master 和 worker。

3. 现在新旧版本会同时服务，共同处理请求保证服务的不间断。`kill -WINCH old_nginx.pid` 来逐步关闭 old worker。

4. 待 old worker 完全退出，新版本工作没有问题，用 `kill -QUIT old_nginx.pid` 完全退出旧版，nginx.pid.oldbin 会被自动更新为 new_nginx.pid，升级完成。

5. 如果新版本有处理失败，需要回滚旧版，用 `kill -HUP old_nginx.pid` 重新启动 old worker，`kill -QUIT new_nginx.pid` 退出新版本。

More:

* [Upgrading To a New Binary On The Fly][1]
* [Controlling nginx][2]

[1]:http://wiki.nginx.org/CommandLine#Upgrading_To_a_New_Binary_On_The_Fly
[2]:http://nginx.org/en/docs/control.html

