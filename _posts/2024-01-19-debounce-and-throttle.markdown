---
layout: post
title: Debounce and Throttle
date: 2024-01-19 18:05:33 +0800
---

1. debounce 延迟生效，将间隔不超过设定时间的多次连续调用变成一次。如果在设定时间内连续两次调用，第一次调用会被取消，如果设定时间内没有再次调用，则生效执行
2. throttle 节流阀，确保函数被多次连续调用时，在设定时间内最多只执行一次
3. debounce 和 throttle 都可以用于降低事件处理函数的调用频率，以提高性能
4. 在连续快速输入时，debounce 会等待最后一次输入后才执行，autocomplete 场景很有用
5. throttle 会规律、稳定的执行，但是会有一定的延迟

- <https://reorx.com/blog/debounce-and-throttle/>
- <https://kettanaito.com/blog/debounce-vs-throttle>
