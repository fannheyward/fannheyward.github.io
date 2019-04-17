---
layout: post
title: logrotate
date: 2019-04-17 15:03:33 +0800
---

> logrotate - rotates, compresses, and mails system logs

```
# 0 0 * * * /usr/sbin/logrotate --state=/home/serv/logrotate.state /home/serv/logrotate.log.conf
/home/serv/logs/dev.log
/home/serv/logs/access.log {
    rotate 10
    daily
    compress
    create
    copytruncate
    missingok
    dateext
    dateformat -%Y-%m-%d
    dateyesterday

    sharedscripts
    postrotate
        kill -USR1 `cat /var/run/nginx.pid`
    endscript
}
```

1. 要么保存到 /etc 配置，由系统调度。也可以自己通过 crontab 调度控制，这种情况要注意加 `--state` 来保存状态
2. 像 nginx 可以通过 `kill -USR1` 来重新打开日志文件，如果服务不支持可以用 `copytruncate`，先拷贝再清空