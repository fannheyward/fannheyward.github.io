---
layout: post
title: "Mysql 5.0降级导入Mysql 4.0"
---

直接导入数据库时出现错误：`#1064 - You have an error in your SQL syntax.` 语法错误，那就是说数据库文件没有错误，但sql语法上有问题，可惜sql学的不怎么样，看了半天也没有看出来哪里出错了，Google告诉我好像是Mysql版本兼容问题。赶紧看了一下空间的Mysql版本，盘今的是5.0几的，盘古提供的临时合租服务器的Mysql是4.0.27的，嗯，应该就是这个原因了，想办法解决之。

在本地的xampp环境mysql版本是5.0.51，phpmyadmin新建一个数据库，然后将备份的数据库文件导入成功，然后再导出：选中要导出的数据库，在"Options”组合框的"SQL compatibility mode"选中"MYSQL40"，在"Structure"组合框中选中"Add IF NOT EXISTS"，"Add AUTO_INCREMENT value"，"Enclose table and field names with backquotes"，在下面的"Export type"中选择"REPLACE"，选中"Save as file"，"zipped"和"gzipped"压缩看数据库大小选择，然后"Go"把生成的SQL文件保存到磁盘，导出结束。

导入到空间数据库中，这一步很简单了，一步成功：Import has been successfully finished.
