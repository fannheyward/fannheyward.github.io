---
layout: post
title: App broken on Silicon macOS
date: 2023-03-20 14:19:59 +0800
---

> "App" can’t be opened. You should move it to the Trash

or

> "App" 已损坏，无法打开。你应该将它移到废纸篓。

Solution:

`sudo xattr -rd com.apple.quarantine /Applications/App.app`
