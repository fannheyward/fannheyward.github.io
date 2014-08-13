---
layout: post
title: "SQL LEN function in MySQL"
---

SQL: The LEN() function returns the length of the value in a text field.

> `SELECT LEN(column_name) FROM table_name`

BUT: in MySQL LEN() does NOT work,it's called LENGTH().

> `SELECT * FROM table_name WHERE LENGTH(column_name) < 5`

via [1](http://w3schools.invisionzone.com/index.php?showtopic=31715) [2](http://dev.mysql.com/doc/refman/5.1/en/string-functions.html#function_length)

