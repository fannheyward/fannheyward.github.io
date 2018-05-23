---
layout: post
title: "Date Timestamp Conversion in Lua"
date: 2014-01-02 10:16
---

#### Datetime to Timestamp

``` lua
local dt = {year=2013, month=12, day=25, hour=0, min=0, sec=0}
print(os.time(dt))

-- 1387900800
```

#### Timestamp to Datetime

``` lua
local ts = os.time()
print(os.date('%Y-%m-%d %H:%M:%S', ts)

-- 2013-12-25 22:09:51
```

More: [Date and Time](http://www.lua.org/pil/22.1.html)

