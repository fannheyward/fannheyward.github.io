---
layout: post
title: "os.walk() digging into the specified level"
---

os.walk() 指定递归遍历深度。

```
def walklevel(some_dir, level=1):
  some_dir = some_dir.rstrip(os.path.sep)
  assert os.path.isdir(some_dir)
  num_sep = len([x for x in some_dir if x == os.path.sep])
  for root, dirs, files in os.walk(some_dir):
      num_sep_this = len([x for x in root if x == os.path.sep])
      if num_sep + level <= num_sep_this:
          del dirs[:]
```

重点是 **del dirs[:]**，置空 dirs，递归到此结束。

