---
layout: post
title: 动态添加/删除 Hadoop DataNode
date: 2019-07-31 16:28:11 +0800
---

### 添加节点

1. NameNode 添加节点 `etc/hadoop/slaves`
1. 同步 `etc/hadoop` 配置
1. 在新节点 `./sbin/hadoop-daemon.sh start datanode`

### 删除节点

1. 在 `etc/hadoop/excludes` 写入要删掉的节点地址
2. 修改 `etc/hadoop/ hdfs-site.xml`:

```xml
  <property>
    <name>dfs.hosts.exclude</name>
    <value>/home/web/hadoop/etc/hadoop/excludes</value>
  </property>
```

1. 修改 `etc/hadoop/mapred-site.xml`, 这个是下线 nodemanager

```xml
  <property>
    <name>mapred.hosts.exclude</name>
    <value>/home/web/hadoop/etc/hadoop/excludes</value>
    <final>true</final>
  </property>
```

1. 修改 `etc/hadoop/slaves`，去掉要删除的节点
1. 同步 `etc/hadoop/excludes` 和 `etc/hadoop/slaves` 到所有 **NameNode**
1. 在 NameNode 执行 `./bin/hadoop dfsadmin -refreshNodes`
1. `./bin/hadoop dfsadmin -report` 查看要删除的节点状态变化 `Normal -> Decommission in progress -> Decommissioned`
1. 在要删除的节点 `./sbin/hadoop-daemon.sh stop datanode`，等待 Admin State 变更为 Dead

- [https://blog.csdn.net/Mark_LQ/article/details/53393081](https://blog.csdn.net/Mark_LQ/article/details/53393081)
