---
layout: post
title: Nginx If Is Evil
date: 2015-02-09 15:44:55 +0800
---

官方文档 [IfIsEvil][1].

简单说在 `location` 中要尽量避免使用 if，如果一定要用，确保 if body 中只包含 **return** or **rewrite**，其他指令可能会出现莫名错误。

解决方案就是用 `try_files` 替换：

```
location / {
    try_files $uri $uri/index.html $uri.html =404;
}
```

如果想 if 和 try_files 一起用，可以把 if 放在 `location` 外：

```
set $APP 'unknown';
if ($query_string ~ "app=([^&]+)") {
   set $APP $1;
}
location = /api {
   try_files /$APP/data.json /data.json =404;
}
```

----

Nginx [Pitfalls][2] 列举了一些 nginx 陷阱，值得学习。

----

春哥这篇 [How nginx "location if" works][3] 做了逐步分析，学习。

[1]:http://wiki.nginx.org/IfIsEvil
[2]:http://wiki.nginx.org/Pitfalls
[3]:http://agentzh.blogspot.jp/2011/03/how-nginx-location-if-works.html
