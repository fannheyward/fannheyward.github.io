---
layout: post
title: "定时备份MySQL数据库到邮箱"
---

照网上例子写了个 bash 脚本，自动备份 MySQL 数据库，并通过 mutt 发邮件到邮箱。

先设置 mutt：vim ~/.muttrc

```
set envelope_from=yes
set from=back@mail.com
set realname="DBBackup"
set use_from=yes
```

Bash 脚本内容，vim back.sh

```
#!/bin/bash
date=date +%Y%m%d
mysqldump DBNAME -u USERNAME -pPASSWORD > /backup/$date.sql
tar czPf /backup/$date.tar.gz /backup/$date.sql
mutt -s "DBBackup" mail@mail.com -a /backup/$date.tar.gz < /backup/mailContent
rm -f /backup/$(date +%Y%m%d -d "5 days ago").sql
rm -f /backup/$(date +%Y%m%d -d "5 days ago").tar.gz
```

权限修改：`chmod +x back.sh`

更新 crontab：`27 3 * * * root /back/back.sh`

