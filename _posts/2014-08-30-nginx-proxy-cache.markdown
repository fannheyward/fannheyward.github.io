---
layout: post
title: "Nginx proxy_cache"
date: 2014-08-30 15:15:35 +0800
---

Nginx [proxy_cache][1] 可以将后端动态请求的返回内容进行缓存，原理是 URL 作为 cache_key，将内容缓存到磁盘，新请求符合缓存规则的话直接读取缓存内容返回。

```
proxy_cache_path /tmp/ngx_cache/proxy_cache_dir levels=1:2 keys_zone=ngx_cache:10m inactive=30m max_size=500m;
proxy_temp_path  /tmp/ngx_cache/proxy_temp_dir;

server {
    proxy_cache ngx_cache;
    proxy_cache_valid 10m;
    add_header  Nginx-Cache "$upstream_cache_status";

    set $no_cache '';
    set_by_lua $cache_key "
        local no_cache = false
        if ngx.var.http_cookie and string.find(ngx.var.http_cookie, 'user') then
            # 带 cookie 的请求(比如登录用户)忽略缓存
            no_cache = true
        end

        if ngx.var.uri == '/api/test' then
        	  #某些 URL 的请求强制缓存，不管是否有 cookie
            no_cache = false
        end

        if no_cache then
            #确定忽略缓存就不再计算 cache_key
            ngx.var.no_cache = 'true'

            return ngx.var.uri
        end

        local uri_args = ngx.req.get_uri_args()
        local args = {}
        for k, v in pairs(uri_args) do
            if k and v and type(v) == 'string' then
                if k == 'count' or k == 'sort' or k == 'page' then
                    #过滤掉非法请求参数
                    args[#args+1] = k .. '=' .. v
                end
            end
        end

        if #args > 0 then
            table.sort(args)
            return ngx.var.uri .. '?' .. table.concat(args, '&')
        else
            return ngx.var.uri
        end
    ";
    
    proxy_cache_key $cache_key;
    proxy_no_cache $no_cache;
    proxy_cache_bypass $no_cache;
    
    location / {
	     proxy_pass http://localhost:8080;
    }
}
```

配置 proxy_cache 很简单，建议先通读 [NGINX Content Caching][2] 文档。记几点笔记：

1. 用 OpenResty(ngx_lua) 作为前端 Nginx 代理和缓存服务器，好处是可以用 `set_by_lua` 计算赋值变量，原生 set 语法不够灵活。
2. `proxy_cache_path` 指定缓存文件目录，和 `proxy_temp_path ` 最好设置在同一文件分区下，缓存内容是先写在 temp_path，然后移动到 cache_path，不同文件分区会影响性能。
3. `keys_zone` 命名并设置缓存的内存空间大小，要注意的是这个内存空间并不保存缓存文件，而是缓存文件的元信息(meta information)，所以不必太大，根据文档 1M 大小可保存 8000 文件的元信息，可以根据缓存文件数量进行设置。
4. `inactive=30m` 表示 30 分钟没有被访问的文件会被 cache manager 删除，`max_size=500m` 表示缓存目录最大限制 500M 磁盘空间。
5. `proxy_cache` 指明用哪个缓存空间，`proxy_cache_valid` 是缓存的有效时间，可以针对不同响应状态设置不同的有效时间，比如 `proxy_cache_valid 404 1m;`，默认只对 200/301/302 响应进行缓存。
6. 缓存文件数量过多会影响 proxy_cache 性能，Nginx 在启动时 cache manager 会检查并读取缓存文件的元信息到内存，这个读取是有限制的，默认情况下 cache manager 每次读取 100 个文件的元信息，每次读取限时 200ms，间隔 50ms 进行下次读取。
7. 缓存文件并不是越多越好，所以 cache_key 的设计非常关键。代理或 URL 跳转常常会添加的无用请求参数，这就会出现不同的 cache_key 保存了多份相同的缓存内容，这对缓存效果影响很大。通过 ngx_lua 可以对 URL 参数进行过滤，保证 cache_key 唯一。
8. `table.sort(args)` 对 URL 参数重排序，避免 `/api?page=1&count=10` `/api?count=10&page=1` 生成两份缓存的情况。
9. `$upstream_cache_status` 可以获取缓存状态，包括 `HIT/BYPASS/MISS/EXPIRED`，可以记录到 access_log 和 response header，用以计算缓存命中率。
10. `proxy_no_cache` 如果有值且不为 '0'，该请求的 response 就不会生成缓存。
11. `proxy_cache_bypass` 如有有值且不为 '0'，该请求会忽略缓存。
12. proxy_cache 不支持手动清除缓存，可以通过第三方模块 ngx_cache_purge 来清除指定 URL 的缓存。

proxy_cache 非常的简单高效，合理使用可以有效的减轻后端服务压力，提升服务访问速度。

[1]:http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache
[2]:http://nginx.com/resources/admin-guide/caching/
