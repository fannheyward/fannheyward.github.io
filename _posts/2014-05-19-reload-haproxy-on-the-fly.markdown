---
layout: post
title: "Reload HAProxy on the fly"
date: 2014-05-19 15:52:11 +0800
---

```
haproxy -f /etc/haproxy/haproxy.cfg -p /var/run/haproxy.pid -sf $(cat /var/run/haproxy.pid)
```

