---
layout: post
title: "用Mysql学数据库"
---

这个学期开了数据库的课。学数据库肯定就要有实践环节，对我们来说就是实验，一周半天呆在机房。实验室装的是微软的东西，sql server 2000企业版，自己的xp上还装不了企业版的，个人版好像差点功能，还有就是sql server太过于庞大了，差不多1G的大小实在是感觉浪费，我能用的仅仅是一点点功能而已。忽然想起来wordpress用的是mysql的数据库，是啊，为啥不用这么好的东西呢？开源，免费，小巧，开工！

Mysql官方中文站下载安装，这里有一个不错的[安装教程](http://tech.163.com/06/0206/11/299AMBLT0009159K_3.html)。

```
创建数据库：
CREATE DATABASE db_name;

显示已经创建的数据库：
SHOW DATABASES;

删除数据库：
DROP DATABASE;
```
