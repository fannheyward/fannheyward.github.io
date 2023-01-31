---
layout: post
title: 动态添加/删除 Hadoop DataNode
date: 2019-07-31 16:28:11 +0800
---

### 添加节点

1. NameNode 添加节点 `etc/hadoop/slaves`
1. 同步 `etc/hadoop` 配置
1. 在新节点 `./sbin/hadoop-daemon.sh start datanode`
1. 在 NameNode 刷新 `hdfs dfsadmin -refreshNodes`

### 删除节点

1. 在 `etc/hadoop/excludes` 写入要删掉的节点地址
2. 修改 `etc/hadoop/hdfs-site.xml`:

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
1. 在 NameNode 执行 `hdfs dfsadmin -refreshNodes`
1. `hdfs dfsadmin -report` 查看要删除的节点状态变化 `Normal -> Decommission in progress -> Decommissioned`
1. 在要删除的节点 `./sbin/hadoop-daemon.sh stop datanode`，等待 Admin State 变更为 Dead

### 检查节点

`hdfs fsck /` 检查文件系统信息，正常是 `Status: HEALTHY`，如果 `Status: CORRUPT` 说明 blocks 有损坏，其中 `Missing blocks` 表示有丢失，但有备份，`Missing blocks (with replication factor 1)` 表示 block 损坏丢失也没有备份，不可恢复。

可以用 `hdfs fsck / -delete` 来检查并删除有损坏的 blocks.

### 调整 JournalNode

1. 修改 `etc/hadoop/hdfs-site.xml`:

```xml
<property>
    <name>dfs.namenode.shared.edits.dir</name>
    <value>qjournal://hadoop01:8485;hadoop02:8485;hadoop03:8485/cluster</value>
  </property>
```

1. 同步到所有节点
2. 如果是新增节点，要同步 `dfs.journalnode.edits.dir` 下 edits 文件
3. 在调整的 journalnode 节点启动/关停: `./sbin/hadoop-daemon.sh start journalnode`
4. 重启 standby NameNode: `sbin/hadoop-daemon.sh stop|start namenode`
5. 切换节点为 active: `hdfs haadmin -failover nn1 nn2`，重启其他 namenode
6. 检查 NN 状态 `hdfs haadmin -getServiceState nn1`

### 调整 Spark 节点

- 新增：在 worker 上 `./sbin/start-slave.sh spark://master:7077`
- 删除: 在 worker 上 `./sbin/stop-slave.sh`，需要注意的是如果 `$SPARK_PID_DIR` 没有指定的话，默认是在 `/tmp`，类似 `/tmp/spark-hadoop-org.apache.spark.deploy.worker.Worker-1.pid`
- 在 master 节点修改 `conf/slaves`

- [https://www.jianshu.com/p/727da7ba438a](https://www.jianshu.com/p/727da7ba438a)
- [https://www.iteye.com/blog/shift-alt-ctrl-2102571](https://www.iteye.com/blog/shift-alt-ctrl-2102571)
