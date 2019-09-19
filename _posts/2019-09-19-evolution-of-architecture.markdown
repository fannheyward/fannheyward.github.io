---
layout: post
title: "[转]服务端高并发分布式架构演进之路"
date: 2019-09-19 10:12:11 +0800
external-url: https://segmentfault.com/a/1190000018626163
---

> 原文 [服务端高并发分布式架构演进之路](https://segmentfault.com/a/1190000018626163)，本文以淘宝作为例子，介绍从一百个并发到千万级并发情况下服务端的架构的演进过程，同时列举出每个演进阶段会遇到的相关技术，让大家对架构的演进有一个整体的认知，文章最后汇总了一些架构设计的原则。

1. ![0](https://image-static.segmentfault.com/266/495/2664959638-5ca02e1d2e99b_articlex)
1. ![1](https://image-static.segmentfault.com/257/135/2571350918-5ca02dfbdc242_articlex)
1. ![2](https://image-static.segmentfault.com/108/886/1088865837-5ca031313f044_articlex)
1. ![3](https://image-static.segmentfault.com/287/264/2872647211-5c95fef4928ad_articlex)
1. ![4](https://image-static.segmentfault.com/158/988/1589885053-5c96032e3c356_articlex)
1. ![5](https://image-static.segmentfault.com/250/737/250737400-5c9653d44e54e_articlex)
1. ![6](https://image-static.segmentfault.com/111/902/111902257-5c960f793734f_articlex)
1. ![7](https://image-static.segmentfault.com/115/755/1157555056-5c965af7a8de0_articlex)
1. ![8](https://image-static.segmentfault.com/189/622/1896228394-5c9662ac87756_articlex)
1. ![9](https://image-static.segmentfault.com/119/002/1190021994-5ca03c930e572_articlex)
1. ![10](https://image-static.segmentfault.com/199/226/1992263855-5ca04d46dd717_articlex)
1. ![11](https://image-static.segmentfault.com/651/851/651851067-5ca04fe08f7ee_articlex)
1. ![12](https://image-static.segmentfault.com/116/244/1162448692-5ca052a998911_articlex)
1. ![13](https://image-static.segmentfault.com/276/074/2760745238-5ca055e4b20a9_articlex)
1. ![14](https://image-static.segmentfault.com/140/934/1409345676-5ca05cae06402_articlex)

架构设计的原则:

1. N+1设计。系统中的每个组件都应做到没有单点故障；
1. 回滚设计。确保系统可以向前兼容，在系统升级时应能有办法回滚版本；
1. 禁用设计。应该提供控制具体功能是否可用的配置，在系统出现故障时能够快速下线功能；
1. 监控设计。在设计阶段就要考虑监控的手段；
1. 多活数据中心设计。若系统需要极高的高可用，应考虑在多地实施数据中心进行多活，至少在一个机房断电的情况下系统依然可用；
1. 采用成熟的技术。刚开发的或开源的技术往往存在很多隐藏的bug，出了问题没有商业支持可能会是一个灾难；
1. 资源隔离设计。应避免单一业务占用全部资源；
1. 架构应能水平扩展。系统只有做到能水平扩展，才能有效避免瓶颈问题；
1. 非核心则购买。非核心功能若需要占用大量的研发资源才能解决，则考虑购买成熟的产品；
1. 使用商用硬件。商用硬件能有效降低硬件故障的机率；
1. 快速迭代。系统应该快速开发小功能模块，尽快上线进行验证，早日发现问题大大降低系统交付的风险；
1. 无状态设计。服务接口应该做成无状态的，当前接口的访问不依赖于接口上次访问的状态。
