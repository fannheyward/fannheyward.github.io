---
layout: post
title: Nginx + Websocket
date: 2018-05-29 11:19:45 +0800
---

```
upstream ws {
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;
}

server {
    listen  8090;

    location / {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_pass http://ws;
    }
}
```

在 Nginx reload 的时候，socket 连接并不会中断。