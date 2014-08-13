---
layout: post
title: "JSP连接MySql数据库"
---

相关环境：XAMPP 外加 Tomcat 6.0 扩展；JDK 并配置好环境变量；Mysql 里新建数据库，表。

JSP 使用 Mysql 主要是通过 `com.mysql.jdbc.Driver` 驱动，Tomcat 一般都自带的有，～\tomcat\lib\mysql-connector-java-5.1.6-bin.jar 有这个包就可以。新建 jsp-mysql.jsp 页面：

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<%@ page contentType="text/html;charset=utf-8" %>
<%@ page language="java" %>
<%@ page import="com.mysql.jdbc.Driver" %>
<%@ page import="java.sql.*" %>
<html>
<head>
    <title>Untitled</title>
</head>
 <body>
     <%
     String url ="jdbc:mysql://localhost/myguestbook";
     String user="root";
     String password="root";
     Connection conn= DriverManager.getConnection(url,user,password);
     Statement stmt=conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
     String sql="SELECT * FROM gb_content";
     ResultSet rs=stmt.executeQuery(sql);
     while(rs.next()) { 百分号>
     编号：<%=rs.getString(1)%>
     <百分号}%>
     <%rs.close();
     stmt.close();
     conn.close();%>
 </body>
</html>
```

没有差错的话一般就会连接成功的。继续学习 JSP.
