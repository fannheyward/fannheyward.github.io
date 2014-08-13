---
layout: post
title: "SQL学习--单表查询"
---

指定列：`select Sno,Sname from Student;`

查询经过计算的值：`select Sname, 'year of birth:', 2008-Sage, Sdept from student;`

去除取值重复的行：`select distinct Sno from student;`

足条件的元组：`select Sname,Sage from Student where Sdept ='CS' AND Sage&lt;=19;`

确定范围，集合 `select Sname from Student where Sage BETWEEN 18 AND 20;`

匹配查询 `select * from Student where Sno LIKE '100%';`

Order By子句 `select Sno,Grade from SC where Cno ='2' ORDER　BY Grade DESC;` //DESC是降序，缺省为升序

聚集函数：`select COUNT(Sno) from Student;`

Group By子句：`select Cno,COUNT(Cno) from SC GROUP BY Cno;`

