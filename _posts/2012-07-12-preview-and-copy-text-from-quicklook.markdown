---
layout: post
title: "Preview and Copy text from QuickLook"
date: 2012-07-12 09:18
---

1. Enable QuickLook for all plain text file with [QLStephen][0]
1. Open Terminal and run following code:
> defaults write com.apple.finder QLEnableTextSelection -bool true; killall Finder
1. Done.

via [1][1], [2][2]

[0]:https://github.com/whomwah/qlstephen/downloads
[1]:http://coderwall.com/p/dlithw
[2]:http://coderwall.com/p/94rlia

