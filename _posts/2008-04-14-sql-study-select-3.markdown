---
layout: post
title: "SQL学习--嵌套查询"
---

IN谓词子查询：

```
select Sno,Sname,Sdept from Student
where sdept IN
 (select Sdept from Student where Sname ='WANG');

select Sno,Sname from Student where Sno IN
 (select Sno from SC where Cno IN
  (select Cno from Course where Cname ='shujuku4'))
```

ANY(SOME)或ALL谓词子查询：

```
select Sname,Sage from Student
where Sage < ANY ( select Sage from Student where Sdept ='CS')
AND Sdept <> 'CS';
```

EXISTS谓词子查询：

```
select Sname from Student where EXISTS
    (select * from SC where Sno =Student.Sno AND Cno='1');

select DISTINCT Sno from SC SCX where NOT EXISTS
  (select * from SC SCY where SCY.Sno ='1002' AND NOT EXISTS
    (select * from SC SCZ where SCZ.Sno = SCX.Sno AND SCZ.Cno = SCY.Cno));
```
