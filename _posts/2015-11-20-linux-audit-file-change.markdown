---
layout: post
title: Linux 监控文件被什么进程修改
date: 2015-11-20 00:04:25 +0800
---

安装: `apt-get install auditd`.

1. `auditd` 是后台守护进程，负责监控记录
2. `auditctl` 配置规则的工具
3. `auditsearch` 搜索查看
4. `aureport` 根据监控记录生成报表

比如，监控 `/root/.ssh/authorized_keys` 文件是否被修改过：

`aditctl -w /root/.ssh/authorized_keys -p war -k auth_key`

* `-w` 指明要监控的文件
* `-p awrx` 要监控的操作类型，append, write, read, execute
* `-k` 给当前这条监控规则起个名字，方便搜索过滤

查看修改纪录：`ausearch -i -k auth_key`，生成报表 `aureport`.
