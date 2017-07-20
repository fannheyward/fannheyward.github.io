---
layout: post
title: cURL Notes
date: 2017-07-20 15:44:13 +0800
---

* `curl -c cookie.txt URL`: save cookies to cookie.txt
* `curl -b cookie.txt URL`: read cookie from cookie.txt and put into request
* `curl -H 'User-Agent: FakeUA' URL`: set HTTP header
* `curl -I URL`: show header only
* `curl -L URL`: follow 30x redirect
* `curl -o new_name/-O URL`: save response to file
* `curl -X POST --data "data=xxx" URL`: POST data to URL
* `curl -w "@curl-format.txt" URL`: format details of request, which you can use this to timing request:

```
➜ cat curl-format.txt
    time_namelookup:  %{time_namelookup}\n
       time_connect:  %{time_connect}\n
    time_appconnect:  %{time_appconnect}\n
      time_redirect:  %{time_redirect}\n
   time_pretransfer:  %{time_pretransfer}\n
 time_starttransfer:  %{time_starttransfer}\n
                    ----------\n
         time_total:  %{time_total}\n

➜ curl -w "@curl-format.txt" -o /dev/null -s https://fann.im
    time_namelookup:  0.015
       time_connect:  0.015
    time_appconnect:  0.329
      time_redirect:  0.000
   time_pretransfer:  0.329
 time_starttransfer:  0.377
                    ----------
         time_total:  0.377
```
