---
layout: post
title: Converting MyISAM to InnoDB
date: 2017-06-14 11:36:11 +0800
---

![](http://mysql.taobao.org/monthly/pic/2016-03-10/engine.png)

如果数据量小且不在服务中，可以直接修改表结构：

```
ALTER TABLE table_name ENGINE=InnoDB;
```

然后现实是需要迁移表的数据量往往很大，不好直接 ALTER。一个办法是导出-修改表结构-导入，需要修改的有表名，engine，导入后重命名新／旧表。需要注意的是 mysqldump 默认有 `DROP TABLE` 命令，需要去掉，不然导入时候会直接删掉旧表。

还有一个方法是按照旧表结构新建表，将数据从旧表导入新表：

```
CREATE TABLE innodb_table LIKE mytable;
ALTER TABLE innodb_table ENGINE=InnoDB;
INSERT INTO innodb_table SELECT * FROM mytable;
```

数据量大的话可以事务处理：

```
START TRANSACTION;
INSERT INTO innodb_table SELECT * FROM mytable WHERE id BETWEEN x AND y;
COMMIT;
```

数据验证完整后重命名：

```
RENAME TABLE mytable TO mytable_old, innodb_table TO mytable;
//DROP TABLE mytable_old;
```

* [Converting Tables from MyISAM to InnoDB](https://dev.mysql.com/doc/refman/5.7/en/converting-tables-to-innodb.html#innodb-convert-convert)
* [Converting big table from MyISAM to Innodb](https://serverfault.com/q/51982/103081)
