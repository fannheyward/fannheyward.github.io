---
layout: post
title: docker-compose for MySQL + phpMyAdmin
date: 2018-03-21 11:43:26 +0800
---

```
version: '3'
services:
  mysql:
    image: 'mysql:5'
    container_name: 'mysql'
    command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --init-connect='SET NAMES UTF8;'
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: 'test'
  phpmyadmin:
    image: 'phpmyadmin/phpmyadmin'
    container_name: 'phpmyadmin'
    links:
      - mysql
    ports:
      - '8080:80'
    environment:
      PMA_HOST: mysql
```
