---
layout: post
title: "Logging mode: Push vs. Pull"
date: 2018-03-08 16:11:17 +0800
---

日志收集或监控系统有两种工作模式，Push or Pull：

* Push 是在应用内自己主动把监控指标推送到监控系统
* Pull 是应用把指标按照指定的格式暴露出来，由监控系统定期的抓取收集，看起来像是监控系统从应用拉取

Push mode:

* 对于 event-drive 类型的监控更为灵活方便
* 应用多点部署不影响监控
* 可能对监控系统 DDos
* 要注意推送频率控制，以及失败后的重试机制

Pull mode:

* 方便控制收集频率，对应用压力可控，侵入也小
* 更及时的发现服务宕机
* 需要大量配置监控接入点，尤其是应用集群化
* 指标不够实时，顺序可能错乱
* 监控指标一般是通过 log 文件或 HTTP 接口对外暴露，parser 较为复杂

Push:

* [StatsD](https://github.com/etsy/statsd)
* [InfluxDB](https://www.influxdata.com)

Pull:

* [Kafka](http://kafka.apache.org/documentation.html#design_pull)
* [Prometheus](https://prometheus.io/docs/introduction/faq/#why-do-you-pull-rather-than-push)
* [fluentd](https://github.com/fluent/fluentd)
* [collectd](https://github.com/collectd/collectd)
