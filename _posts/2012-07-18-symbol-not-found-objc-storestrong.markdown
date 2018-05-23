---
layout: post
title: "Symbol not found: _objc_storeStrong"
date: 2012-07-18 21:51
---

Crash log:

```
dyld: lazy symbol binding failed: Symbol not found: _objc_storeStrong
  Referenced from: /var/mobile/Applications/6E4A4771-B39A-48B9-A7B7-0EA0108DCAF4/X.app/X
  Expected in: /usr/lib/libobjc.A.dylib

dyld: Symbol not found: _objc_storeStrong
  Referenced from: /var/mobile/Applications/6E4A4771-B39A-48B9-A7B7-0EA0108DCAF4/X.app/X
  Expected in: /usr/lib/libobjc.A.dylib
```

在 Non-ARC 项目中使用 ARC-enabled 库的时候，需要对库文件在 Build Phases->Compile Sources 添加 `-fobjc-arc` Compiler Flags，在 Build Settings->Other Linker Flags 添加 `-fobjc-arc`.

via [libobjc.A.dylib compile error on iOS 4.3][1], [Static library with ARC support linked to non-ARC project causing linker errors][2].

[1]:http://stackoverflow.com/a/8149079/380774
[2]:http://stackoverflow.com/a/8757075/380774

