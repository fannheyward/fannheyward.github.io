---
layout: post
title: "CocoaPods Podspec for Static Library"
date: 2014-05-27 22:12:48 +0800
---

新建 podspec 可以用命令 `pod spec create YourLibrary` 自动生成 YourLibrary.podspec，然后根据具体项目进行修改。对于 **libYourLibrary.a** 形式的静态库需要注意的地方:

```
s.source_files = '*.h'
s.preserve_paths = 'libYourLibrary.a'
s.library = 'YourLibrary'
s.xcconfig = { 'LIBRARY_SEARCH_PATHS' => '$(PODS_ROOT)/YourLibrary' }
```

`preserve_paths` 可以用 `*.a` 模糊匹配或指明静态库名，`LIBRARY_SEARCH_PATHS` 指定路径。

参考 [CocoaPod/Podspec and *.framework](http://stackoverflow.com/a/14127129/380774)

