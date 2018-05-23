---
layout: post
title: "Enable SPDY in Firefox 11"
date: 2012-03-14 09:41
---

[SPDY][1] is a new network protocol developed by Google for faster web. Google Chrome has a build-in support of SPDY long long ago. Now Firefox brings SPDY support in Firefox 11, but is disabled by default. You can enable it as follow:

Open `about:config` in Firefox, search `network.http.spdy.enabled` and set to `true`. via [here][2]

[1]:https://en.wikipedia.org/wiki/SPDY
[2]:https://bugzilla.mozilla.org/show_bug.cgi?id=528288#c174
