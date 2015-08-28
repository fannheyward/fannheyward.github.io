---
layout: post
title: 根据时间自动切分 Nginx.log
date: 2015-08-08 11:29:45 +0800
---

之前是用[脚本][1]配合 crontab 来做日志切分:

```
#!/bin/bash
# This script run at 00:00

# The Nginx logs path
logs_path="/usr/local/webserver/nginx/logs/"

mkdir -p ${logs_path}$(date -d "yesterday" +"%Y")/$(date -d "yesterday" +"%m")/
mv ${logs_path}access.log ${logs_path}$(date -d "yesterday" +"%Y")/$(date -d "yesterday" +"%m")/access_$(date -d "yesterday" +"%Y%m%d").log
kill -USR1 `cat /usr/local/webserver/nginx/nginx.pid`
```

最近发现可以直接在 nginx.conf 里通过 `$time_iso8601` 提取时间进行设置:

```
if ($time_iso8601 ~ "^(\d{4})-(\d{2})-(\d{2})") {
    set $year $1;
    set $month $2;
    set $day $3;
}

access_log /var/log/nginx/$year-$month-$day-access.log;
```

时间粒度可以更为精细：

```
if ($time_iso8601 ~ "^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})") {
    set $year $1;
    set $month $2;
    set $day $3;
    set $hour $4;
    set $minutes $5;
    set $seconds $6;
}
```

via [Log rotation directly within Nginx configuration file][2]

[1]:http://blog.zyan.cc/nginx_php_v6/
[2]:http://www.cambus.net/log-rotation-directly-within-nginx-configuration-file/