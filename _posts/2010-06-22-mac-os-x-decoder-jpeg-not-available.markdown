---
layout: post
title: "Mac OS X: decoder jpeg not available"
---

When you are using PIL to resize a JPEG image file, you will probably have a "**decoder jpeg not available**" error,this means that PIL doesn't have JPEG support.

Here is the solution:

1. Download and install MacPorts.
2. **sudo port install jpeg**, this will install libjpeg.
3. **sudo port install py25-pil**

That's it.

