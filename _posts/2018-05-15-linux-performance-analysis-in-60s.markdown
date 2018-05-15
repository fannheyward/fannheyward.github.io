---
layout: post
title: Linux Performance Analysis in 60s
external-url: https://medium.com/netflix-techblog/linux-performance-analysis-in-60-000-milliseconds-accc10403c55
date: 2018-05-15 16:31:14 +0800
---

```
uptime/w --------------------> load average
dmesg | tail ----------------> kernel errors
vmstat 1 --------------------> overall stats every second
mpstat -P ALL 1 -------------> CPU balance
pidstat 1 -------------------> process usage, every second
iostat -xz 1 ----------------> disk I/O
free -m ---------------------> memory usage
sar -n DEV 1 ----------------> network I/O
sar -n TCP,ETCP 1 -----------> TCP stats
top -------------------------> check overview
```
