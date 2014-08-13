---
layout: post
title: "py2exe notes"
---

Python 2.6 以上版本报错：

> error: MSVCP90.dll: No such file or directory

Python 2.5 及以下运行时需要的 runtime DLL 是 MSVCR71.dll，这个打包时候会自动包含进来；Py2.6 及以上运行时需要的 runtime DLL 是 MSVCR90.dll，这个需要手动加载。在 setup.py options 字典添加 **"dll_excludes": ["MSVCP90.dll"]** 解决。[via](http://www.py2exe.org/index.cgi/Tutorial#Step5)

几个 options 参数 [via](http://www.py2exe.org/index.cgi/ListOfOptions)：

- optimize:2 => extra optimization
- includes:list of module names to include
- compressed:1 => create a compressed zipfile
- bundle_files:1 => bundle everything, including the Python interpreter

application failed to initialize properly (0xc0000142) 应用程序正常初始化(0xc0000142)失败

在 setup.py data_files 添加 **("Microsoft.VC90.CRT", ['MSVCR90.dll','Microsoft.VC90.CRT.manifest'])**,留意 Microsoft.VC90.CRT.manifest <file name> 只能有 msvcr90.dll。 [via](http://www.py2exe.org/index.cgi/Tutorial#Step521)

