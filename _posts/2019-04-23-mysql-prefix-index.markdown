---
layout: post
title: MySQL Prefix Index
date: 2019-04-23 16:13:14 +0800
---

```
CREATE TABLE `t1` (
  `bundle` varchar(300) DEFAULT '' COMMENT 'pkg name',
  `domain` varchar(200) DEFAULT '',
  UNIQUE KEY `idx_bundle_domain` (`bundle`(100),`domain`(100))
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
```

关键部分 `bundle(100)` 来解决组合索引可能会出现的 `Specified key was too long; max key length is 767 bytes` 错误。