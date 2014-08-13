---
layout: post
title: "SQL学习--连接查询"
---

等值与非等值连接查询

`select Student.*, SC.* from Student, SC where Student.Sno=SC.Sno;`

外连接

```
select Student.sno,sname,ssex,sage,sdept,cno,grade from Student LEFT JOIN SC ON (Student.sno = SC.sno);
```

自身连接

```
select FIRST.cno,SECOND.cpno from Course FIRST,Course SECOND where FIRST.Cpno = SECOND.Cno;
```

复合条件连接

```
select Student.Sno,Sname,Grade from Student,SC
where Student.Sno = SC.Sno AND
SC.Cno ='1' AND SC.Grade > 80;

select Student.Sno,Sname,Cname,Grade
from Student,SC,Course
where Student.Sno = SC.Sno AND SC.Cno = Course.Cno;
```
