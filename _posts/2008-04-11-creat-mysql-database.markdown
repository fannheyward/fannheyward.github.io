---
layout: post
title: "SQL学习---学生-课程数据库"
---

* 学生表: Student(Sno,Sname,Ssex,Sage,Sdept)
* 课程表：Course(Cno,Cname,Cpno,Ccredit)
* 选课表：SC(Sno,Cno,Grade)

建立学生表Student：

```
CREATE TABLE Student
    (Sno CHAR(9) PRIMARY KEY,
    Sname CHAR(20) UNIQUE,
    Ssex CHAR(2),
    Sage SMALLINT,
    Sdept CHAR(20));
```

建立“课程”表Course：

```
CREATE TABLE Course
    (Cno CHAR(4) PRIMARY KEY,
    Cname CHAR(40),
    Cpno CHAR(4),
    Ccredit SMALLINT,
    FOREIGN KEY (Cpno) REFERENCES Course(Cno)
    /*发现书上的一个错误，外码Cpno必须要加括号*/
    );
```

建立选课表SC：

```
CREATE TABLE SC
    (Sno CHAR(9),
    Cno CHAR(4),
    Grade SMALLINT,
    PRIMARY KEY (Sno,Cno),
    FOREIGN KEY (Sno) REFERENCES Student(Sno),
    FOREIGN KEY (Cno) REFERENCES Course(Cno)
    );
```

插入具体数据：

```
INSERT INTO Student (Sno,Sname,Ssex,Sage,Sdept) VALUES ('1001','ZHANG','M',19,'IS');
```

插入具体数据这一步相当烦人，要一条一条的弄，还要注意外键键值关系，只有键值对应存在的表中才允许插入或者修改，不然就会报错：a foreign key constraint fails...

Update：将数据装入数据库表，可以用LOAD DATA语句。新建文本文档data.txt，每行包括一个记录，用Tab键把值分开，并且按CREATE TABLE中列出的列名次序给出，然后LOAD DATA装入： `LOAD DATA LOCAL INFILE "C:\data.txt" INTO TABLE Student;`

