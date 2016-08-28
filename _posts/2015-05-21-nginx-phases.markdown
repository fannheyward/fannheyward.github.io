---
layout: post
title: Nginx/OpenResty 指令的执行顺序
date: 2015-05-21 16:33:51 +0800
---

* [NginX OpenResty的内建及扩展模块的phase先后执行次序][1]
* [Nginx Phases][2]
* [Nginx配置指令的执行顺序][3]

1. **http**, 可以通过 init_by_lua 加载公共函数，比如 `lua-resty-core`.
2. **server selection**，listen，server_name.
3. **post read**, ngx_realip.
4. **server rewrite**, set, rewrite, return, set_by_lua.
5. **server rewrite tail**, rewrite_by_lua.
6. **server access**, allow, deny.
7. **server access tail**, access_by_lua.
8. **server try_files**.
9. **location**:
	1. prefix strings 遵循 **最长子串匹配原则**
	2. regular expressions 遵循 **先定义优先匹配原则**
	3. `location = {exact_url}` 精准匹配
	4. `location ~ {case-sensitive regex}` 区分大小写
	5. `location ~* {case-insensitive regex}` 不区分大小写
	6. `location ^~ {prefix_string_if_any}` 一旦字符匹配成功，就不再正则匹配
	7. 尽量不要 `if`，换用 `try_files`
	8. `-f` 检测文件是否存在，`-d` 目录，`-e` 文件/目录/符号链接，`-x` 可执行文件
10. **location rewrite**, set, rewrite, return, set_by_lua.
11. **location rewrite tail**, rewrite_by_lua.
12. **preaccess**, 	degradation, limit_zone, limit req, ngx_realip.
12. **location access**, allow, deny, auth_basic.
13. **location access tail**, access_by_lua.
14. **content**, ngx_echo, proxy_pass, content_by_lua.
	1. 请求具体处理阶段，只能有一个 **内容处理程序(content handler)**
	1. 多个 echo 可以共存，因为同属于 ngx_echo 模块，但 ngx_lua 限制只能有一个 content_by_lua.
	2. ngx_echo 的 echo_before_body/echo_after_body 可以和其他模块共存
	3. 如果没有 ngx_echo, proxy_pass, content_lua 这些 content handler，Nginx 会根据 URL 将请求映射到静态资源服务模块，依次是 ngx_index, ngx_autoindex, ngx_static.
	4. ngx_index/ngx_autoindex 处理以 `/` 结尾的请求，ngx_static 正好相反。
15. **output header filter**, more_set_headers 输出 Headers.
16. **output filter** echo_before_body, echo_after_body, body_filter_by_lua.
17. **log**, access_log, error_log, log_by_lua.
18. **post action**.

![](https://cloud.githubusercontent.com/assets/2137369/15272097/77d1c09e-1a37-11e6-97ef-d9767035fc3e.png)

[1]:https://gist.github.com/diyism/36c9d7e699cf3c67352e
[2]:http://wiki.nginx.org/Phases
[3]:http://blog.sina.com.cn/s/articlelist_1834459124_2_1.html
