---
layout: post
title: "Cron notes"
---

Cron is a Linux system process that will execute a program at a preset time. To use cron you must prepare a text file that describes the program that you want executed and the times that cron should execute them. Then you use the **crontab** program to load the text file that describes the cron jobs into cron. via [Using cron](http://www.scrounge.org/linux/cron.html)

**crontab -e** to edit the crontab file.

Format:

> `[min] [hour] [day of month] [month] [day of week] [program to be run]`

Some examples:

> `10 3 * * * /usr/bin/foo`  ==> Will run /usr/bin/foo at 3:10am on every day.

> `12 3 * * * root tar czf /usr/local/backups/daily/etc.tar.gz /etc >> /dev/null 2>&1` via [Cron Help Guide](http://www.linuxhelp.net/guides/cron/)

