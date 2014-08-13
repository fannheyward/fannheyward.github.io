---
layout: post
title: "Python 自动备份 Firefox 配置小脚本"
---

其实就是《A Byte of Python》里面一个例子程序，拿来练练手而已，没啥技术含量。打包压缩程序用的是 7-Zip，安装后安装目录里有一个命令行版的 7z.exe，添加压缩文件的参数是 **a**；自动删除旧备份文件的方法很山寨很暴力，直接 listdir 备份目录下的文件，然后删除第一个，也就是最旧的一个，凑合吧。

```python
#Python 备份 Fx 配置并自动删除旧备份
import os
import time

source = r'C:\FxProfiles'
target_dir = r'C:\FxBackup'
target = target_dir + os.sep + time.strftime('%Y%m%d%H%M%S') + '.zip'
newzip = time.strftime('%Y%m%d%H%M%S') + '.zip'
zip_command = "7z a %s %s" % (target, ' '.join(source))
oldzip = os.listdir(target_dir)
if newzip > oldzip:
    os.remove(target_dir + os.sep + oldzip[0])
    print 'Del OK'

if os.system(zip_command) == 0:
    print 'Successful backup to', target
else:
    print 'Backup FAILED'
```

山寨之极！不过还是玩的不亦乐乎，Python 很有搞头。

