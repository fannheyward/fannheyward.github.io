---
layout: post
title: "Grunt serve with Proxy"
date: 2014-01-03 16:46
categories: [Dev]
---

在用 Grunt 开发时可能需要连接外部服务，比如 `grunt serve` 服务在 `http://127.0.0.1:9000`, 当前页需要请求 `http://127.0.0.1:9090/api` 服务，这时候如果直接请求 `/api` 就变成了 `http://127.0.0.1:9000/api`，结果 404，因为这个地址是不存在的；如果直接请求 `http://127.0.0.1:9090/api` 就会出现跨域问题。

比较方便的解决方案是在 grunt server 层做个代理，把 /api 请求转发到需要的服务。有个现成插件 [grunt-connect-proxy][1] 可以直接用。

下载安装：`npm install grunt-connect-proxy --save-dev`，在 `Gruntfile.js` 添加 `grunt.loadNpmTasks('grunt-connect-proxy');` 启用。修改 `connect` 段设置，添加 `proxies` 和 livereload - middleware：

```
grunt.initConfig({
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ],
          middleware: function (connect, options) {
            var middlewares = [];
            var directory = options.directory || options.base[options.base.length - 1];
            if (!Array.isArray(options.base)) {
                options.base = [options.base];
            }
            options.base.forEach(function(base) {
                // Serve static files.
                middlewares.push(connect.static(base));
            });

            // Setup the proxy
            middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);

            // Make directory browse-able.
            middlewares.push(connect.directory(directory));

            return middlewares;
          }
        }
      },
      proxies: [
        {
          context: '/api',
          host: '127.0.0.1',
          port: 9090,
          https: false,
          changeOrigin: false,
          xforward: false
        }
      ]
    },
});
```

在 `serve` 任务下添加 `configureProxies`，注意要加在 `connect` 任务前：

```
grunt.registerTask('serve', function (target) {
  if (target === 'dist') {
    return grunt.task.run(['build', 'connect:dist:keepalive']);
  }

  grunt.task.run([
    'clean:server',
    'bower-install',
    'concurrent:server',
    'autoprefixer',
    'configureProxies',
    'connect:livereload',
    'watch'
  ]);
});
```

重启 `grunt serve` 即可。

[1]:https://github.com/drewzboto/grunt-connect-proxy

