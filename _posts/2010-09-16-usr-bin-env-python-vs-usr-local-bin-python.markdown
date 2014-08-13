---
layout: post
title: "#!/usr/bin/env python vs #!/usr/local/bin/python"
---


> `#!/usr/bin/env python`

Will figure out the correct location of python and make that as the interpreter for rest of the script.

> `#!/usr/local/bin/python`

Pointing to python is located at /usr/local/bin/python.

简单说 /env python 就是查找系统环境变量中的 python 并默认选择 path 里第一个。/usr/local/bin/python 就是指定使用这个路径下的 python，可能不同机子不同环境下 python 位置稍有差别，就有可能 /usr/local/bin/python 不存在。

via [Here](http://mail.python.org/pipermail/tutor/2007-June/054816.html)

