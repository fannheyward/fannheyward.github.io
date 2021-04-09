---
layout: post
title: MySQL EXPLAIN Notes
date: 2021-04-09 13:54:53 +0800
---

```tet
mysql> explain select * from t1;
+----+-------------+-------+------+---------------+------+---------+------+------+-------+
| id | select_type | table | type | possible_keys | key  | key_len | ref  | rows | Extra |
+----+-------------+-------+------+---------------+------+---------+------+------+-------+
|  1 | SIMPLE      | t1    | ALL  | NULL          | NULL | NULL    | NULL |   20 | NULL  |
+----+-------------+-------+------+---------------+------+---------+------+------+-------+
```

1. `EXPLAIN` 支持 SELECT, DELETE, INSERT, REPLACE, UPDATE
1. `id` 查询编号，有几次 SELECT 操作就有几个编号
1. `select_type` 查询类型
    - `SIMPLE` 简单查询，查询中不包含子查询和 UNION
    - `PRIMARY` 复杂查询最外层的 SELECT
    - `UNION` 在 UNION 中的第二个及随后的 SELECT
    - `UNION RESULT` 从 UNION 临时表进行的 SELECT
    - `SUBQUERY` 子查询中的第一个 SELECT
    - `DERIVED` 包含在 FROM 子句中的子查询
    - `UNCACHEABLE SUBQUERY` 不能被缓存的子查询，每次都要计算，是非常耗时的操作
    - `UNCACHEABLE UNION` UNION 中不能被缓存的查询
1. `table`: 当前查询访问的表名，如果有子查询或 UNION 会有以下几种格式
    - `<unionM,N>`
    - `<derivedN>`
    - `<subqueryN>`
1. `type` 查找访问类型，说明 MySQL 使用哪个索引在该表中找到对应的记录。按最优 - 最差依次是：
    1. `system`
    1. `const` 表中最多有一个匹配行，速度最快
    1. `eq_ref` primary key 或 unique key 索引的所有部分被连接使用，最多只返回一条符合条件的记录
    1. `ref` 不使用唯一索引，而是用普通索引，可能会找到多个符合条件的记录
    1. `fulltext` 使用全文索引的时候才会出现
    1. `ref_or_null` 和 ref 类似，但 MySQL 会额外一个查询来看哪些行包含了 NULL
    1. `index_merge` 使用了索引合并优化
    1. `unique_subquery` 比 eq_ref 复杂的地方是使用了 IN 子查询
    1. `index_subquery` 类似 unique_subquery 但在子查询里使用的是非唯一索引
    1. `range` 指定范围的扫描
    1. `index` 和 ALL 类似，不同的是只扫描索引
    1. `ALL` 全表扫描
1. `possible_keys` 可能用到了哪些索引来查找
1. `key` 实际扫描使用的索引
1. `key_len` 实际使用的索引长度
1. `ref` 查找时所用到的列或常量
1. `rows` 预估要读取的行数
1. `Extra` 额外补充信息
    - Distinct
    - Using index 只使用了索引信息，没有访问行记录
    - Using where 读取行记录后使用 where 判断检查
    - Using temporary MySQL 创建了临时表来处理查询，需要索引优化
    - Using filesort 读取结果后进行了排序操作，需要优化

