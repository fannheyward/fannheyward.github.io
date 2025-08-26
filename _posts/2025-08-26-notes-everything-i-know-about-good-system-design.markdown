---
layout: post
title: Notes: Everything I know about good system design
date: 2025-08-26 11:19:57 +0800
---

> [Everything I know about good system design](https://www.seangoedecke.com/good-system-design/)

GitHub 工程师 @sgoedecke 的文章，一些笔记：

1. software design is how you assemble lines of code, system design is how you assemble services. 程序设计是组装代码，系统设计是组装服务
2. a complex system usually reflects an absence of good design，复杂的系统通常反映了缺乏良好的设计，所以
3. You should try and minimize the amount of stateful components in any system. 尽量无状态服务，有状态意味着在重启、恢复时需要持久化数据，要考虑数据一致性等，增加了复杂度和成本。
4. you should be able to go through the database schema and get a rough idea of what the application is storing and why，好的数据库设计是能够从表结构快速了解应用存储的数据和关系，从而了解应用的业务逻辑
5. Background jobs should be your first choice for slow operations，后台异步处理耗时任务
6. The typical pattern is that junior engineers learn about caching and want to cache everything, while senior engineers want to cache as little as possible. 初级工程师希望缓存所有内容，而高级工程师希望尽量少缓存。原因：缓存是有状态的！
7. put "this thing happened" on the queue，把某个事件发到消息，而不是某个 job，让其他服务订阅者自行决定要做的事情。比如新用户注册事件，A 服务发送欢迎邮件，B 服务扫描帐号，C 服务设置更多权限等
8. pushing and pulling, pull 模式服务简单，push 模式节省资源，没有最优只是合适权衡
9. focus on the "hot paths": the part of the system that is most critically important, and the part of the system that is going to handle the most data. 关注热路径：系统中最重要的部分，以及系统中将处理最多数据的部分。
10. log aggressively during unhappy paths, log 除了记录预期结果，更重要的是帮助排查为什么不预期发生
11. It’s also important to decide what happens when part of your system fails.
12. **good system design is going to look like nothing**
