---
layout: post
title: Cache Pattern
date: 2015-04-01 10:35:19 +0800
---

> There are only two hard things in Computer Science: cache invalidation and naming things. – Phil Karlton

### Read-Through/Write-Through

App-Cache-DB 结构，App 不直接访问 DB，由缓存间接操作。读的时候先从缓存取数据，有就直接返回，没有的话由缓存负责从 DB 读取并更新到 Cache，然后返回数据。写的时候先写缓存，然后由缓存负责更新到 DB，只有 DB 更新完成才算写成功，返回操作结果。好处是缓存数据更新及时，适合读多写少，缺点就是写操作慢。

### Write-Around

跳过缓存直接写数据到 DB。相比 Write-Through 避免了写数据时候对缓存数据的冲洗，缺点是缓存数据不能及时更新。

### Write-Back/Write-Behind

数据写到缓存后操作立即返回结果，然后缓存系统延时＋异步的将数据更新到 DB，一般配合队列处理。这种写操作是最快的，也能避免大量写数据对 DB 的压力。

### Cache-Aside

App 读的时候检查数据是否在缓存中，有就返回，没有的话 App 直接读 DB 返回，同时将数据写入缓存。写操作的时候直接写入 DB，如果缓存中有对应数据，将缓存设置无效或删除，如果数据读取频繁的话也可以直接更新缓存中的数据，保证数据一致性。这种模式更多是有 App 进行数据检查，缓存只做存储。

一些参考：

* https://msdn.microsoft.com/en-us/library/dn589799.aspx
* http://www.computerweekly.com/feature/Write-through-write-around-write-back-Cache-explained
* http://www.infoq.com/cn/articles/write-behind-caching/
* http://docs.oracle.com/cd/E15357_01/coh.360/e15723/cache_rtwtwbra.htm#COHDG5177
* https://www.v2ex.com/t/180474

