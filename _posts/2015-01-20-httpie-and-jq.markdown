---
layout: post
title: "命令行 API 调试工具: HTTPie & jq"
date: 2015-01-20 14:52:05 +0800
---

* [HTTPie][1]: a CLI, cURL-like tool for humans.
* [jq][2]: a command-line JSON processor.

HTTPie 类似 cURL，更简单易用，jq 用来解析 JSON，一起配合使用做 API 开发调试非常方便：

1. GET: `http :9090/api/test`
1. POST: `http -f post --session=fann :9090/api/login' user=fannheyward passwd=passwd`
1. GET with cookie: `http --session=fann :9090/api/profile`

----

1. `jq .` - 格式化整个 JSON
2. `jq ".status"` - 只显示 status 字段的值
3. `jq ". | {name: .name, icon: .icon}"` - 重组 JSON，只显示 name&icon 字段
4. `jq ".[] | {name: .name}"` - 遍历 JSON 数组，只显示每个元素的 name 字段

更多高级用法参考各自文档。

[1]:https://github.com/jakubroztocil/httpie
[2]:http://stedolan.github.io/jq/