---
layout: post
title: OpenResty/Nginx 日志输出到 Rsyslog
date: 2018-10-12 10:48:10 +0800
---

在 OpenResty/Nginx 开发中，日志输出一般是这么两种方案：

1. 通过 `ngx.log(ngx.ERR, ...)` 输出到 error.log
2. `log_by_lua` 阶段通过 [lua-resty-logger-socket][1] 输出到远端 syslog-ng 服务器

第一种方案方便开发，但是会和常规 error.log 比如 404等混在一起。第二种方案可以把日志分开，但需要日志服务器，也不方便开发的时候逐步 log，多用于日志收集分析。回到方案一，可以通过 `rsyslog` 将日志切割到独立文件，方便排查。

nginx:

```
error_log syslog:server=127.0.0.1,tag=nginx_crit;

or

error_log syslog:server=127.0.0.1,tag=nginx_crit crit;

ngx.log(ngx.CRIT, ...)
```

rsyslog:

```
module(load="imudp")
input(type="imudp" port="514" ruleset="ngx_ruleset")

template(name="json" type="list") {
        constant(value="{")
        constant(value="\"timestamp\":\"")      property(name="timereported" dateFormat="rfc3339")
        constant(value="\",\"host\":\"")        property(name="hostname")
        constant(value="\",\"tag\":\"")         property(name="syslogtag" format="json")
        constant(value="\",\"message\":\"")     property(name="msg" format="json")
        constant(value="\"}")
        constant(value="\n")
}

ruleset(name="ngx_ruleset"){
    if $msg contains 'lua' then {
        /var/log/ngx_lua.log
        stop
    }

    action(type="omfile" file="/var/log/ngx.log" template="json")
}
```

* [Logging to syslog](http://nginx.org/en/docs/syslog.html)
* [rsyslog](https://www.rsyslog.com/doc/v7-stable/configuration/filters.html)
* [Rsyslog configuration: forwarding log files with file names, handle multi-line messages, no messages lost on server downtime, failover server][2]


[1]: https://github.com/cloudflare/lua-resty-logger-socket
[2]:https://selivan.github.io/2017/02/07/rsyslog-log-forward-save-filename-handle-multi-line-failover.html
