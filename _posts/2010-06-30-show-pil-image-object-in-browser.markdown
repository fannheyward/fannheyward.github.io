---
layout: post
title: "Show PIL image object in browser"
---

在浏览器显示 PIL 处理过的图片对象。

Using PIL module, you can resize or crop an image and return an image object. After that, I want to show the resized-image-object in browser. Here it is.

```
pic = thumbPicture()
f = StringIO()
pic.save(f,'JPEG')
f.seek(0)
shutil.copyfileobj(f,self.wfile)
self.sendHeader(contenttype = 'image/jpeg',contentlength = f.tell())
f.close()
```

