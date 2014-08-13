---
layout: post
title: "Firefox Tips:Render pages faster"
---

To improve page rendering, enter about:config in the address bar (accept the warning that comes up) and perform the following:

> Create a new integer value named **content.notify.backoffcount** and set the value to 5

> Create a value named **nglayout.initialpaint.delay** and set its value to 0

The first line stops Firefox waiting for the entire page to download before rendering. The second improves speed rendering further by making sure Firefox does not wait for the page layout information to be fully downloaded before displaying the page.

via [Firefox Tips:Tips 2](http://www.linuxlinks.com/article/20091003160004352/Firefox-Tips-Page1.html)

