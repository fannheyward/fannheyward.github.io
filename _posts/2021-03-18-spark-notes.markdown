---
layout: post
title: Spark Notes
date: 2021-03-18 16:54:53 +0800
---

Some Spark articles are worth deep reading:

## [spark-notes](https://spoddutur.github.io/spark-notes/)

1. leave **1 core per node** for Hadoop/Yarn/OS daemons
1. leave **1G + 1 executor** for Yarn ApplicationMaster
1. **3-5 cores per executor** for good HDFS throughput

```text
Full memory requested to yarn per executor = spark.executor.memory + spark.yarn.executor.memoryOverhead

spark.yarn.executor.memoryOverhead = Max(384MB, 7% of spark.executor.memory)
```

So, if we request 15GB per executor, actually we got `15GB + 7% * 15GB = ~16G`

![MemoryOverhead](https://user-images.githubusercontent.com/22542670/27395274-de840270-56cc-11e7-8f3a-f78c4eecdac8.png)

```text
4 nodes
8 cores per node
50GB per node


1. 5 cores per executor: --executor-cores = 5
2. num cores available per node: 8-1 = 7
3. total available cores in cluster: 7 * 4 = 28
4. available executors: (total cores/num-cores-per-executor), 28/5 = 5
5. leave one executor for Yarn ApplicationMaster: --num-executors = 5-1 = 4
6. number of executors per node: 4/4 = 1
7. memory per executor: 50GB/1 = 50GB
8. cut heap overhead: 50GB - 7%*50GB = 46GB, --executor-memory=46GB

4 executors, 46GB and 5 cores each

1. 3 cores per executor: --executor-cores = 3
2. num cores available per node: 8-1 = 7
3. total available cores in cluster: 7 * 4 = 28
4. available executors: (total cores/num-cores-per-executor), 28/3 = 9
5. leave one executor for Yarn ApplicationMaster: --num-executors = 9-1 = 8
6. number of executors per node: 8/4 = 2
7. memory per executor: 50GB/2 = 25GB
8. cut heap overhead: 25GB * (1-7%) = 23GB, --executor-memory=23GB

8 executors, 23GB and 3 cores each
```

## [Spark + Cassandra, All You Need to Know: Tips and Optimizations](https://itnext.io/spark-cassandra-all-you-need-to-know-tips-and-optimizations-d3810cc0bd4e)

1. Spark on HDFS has **low** cost, used in most cases
1. Spark with Cassandra in same cluster, will have best performance in throughput and low latency
1. [Deploy Spark with an Apache Cassandra cluster](https://opencredo.com/blogs/deploy-spark-apache-cassandra/)
1. [Spark Cassandra Connector](https://github.com/datastax/spark-cassandra-connector)
1. [Cassandra Optimizations for Apache Spark](https://itnext.io/cassandra-optimizations-with-apache-spark-3ddf7f81ce43)

### Spark Optimizations

1. **Narrow transformations than Wide transformations**
1. minimize data shuffles
1. filter data as early as possible
1. set the right number of partitions, **4x of partitions** to the number of cores
1. avoid data skew
1. broadcast for small table joins
1. repartition before expensive or multiple joins
1. repartition before writing to storage
1. be remember that repartition is an expensive operation
1. set right number of executors, cores and memory
1. get rid of the the Java Serialization, use [Kryo Serialization](https://github.com/EsotericSoftware/kryo)
1. **Minimize data shuffles and maximize data locality**
1. **Use Data Frames or Data Sets high level APIs to take advantages of the Spark optimizations**
1. [Apache Spark Internals: Tips and Optimizations](https://itnext.io/apache-spark-internals-tips-and-optimizations-8c3cad527ea2)
