---
layout: post
title: "最大化 Xcode Debug Console 窗口"
date: 2012-03-23 18:51
---

参考 [How to get back the Console window in XCode4][1] 做了一点点改动，Run 的时候自动切换到 Console Tab 并且是最大化展示，效果还不错。

1. 打开 Tab 支持，View - Show Tab Bar.
1. 双击或点 + 添加一个 Tab.
1. 双击新加的 Tab 改名，比如 CONSOLE.
1. 激活 Console 显示，View - Debug Aera - Activate Console，或者直接 Command+Shift+C.
1. 拖动 Console 区至顶端，整个 Tab 只显示这个 Console.
1. Command+, 进入 Preferences - Behaviors, 在 **Run Start** 里勾选 **Show Tab**，填 CONSOLE，就是刚才的 Tab 名。
1. Done。

再运行项目时会自动的切换到新 Tab 页查看输出结果，然后通过 Command+Shift+[/] 来切换 Tab.

[1]:http://www.touch-code-magazine.com/how-to-get-back-the-console-window-in-xcode-4/
