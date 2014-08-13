---
layout: post
title: "ImageMagick Notes"
---

- 尺寸缩放

> convert -resize 640x960 input.jpg  output.jpg

> convert -resize 75% input.jpg  output.jpg

- 去除多余 Exif 等信息

> convert -strip input.jpg output.jpg

- 调节压缩比例

> convert -quality 75% input.jpg output.jpg

