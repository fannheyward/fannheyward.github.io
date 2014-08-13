---
layout: post
title: "tmux 使用笔记"
date: 2013-05-13 14:25
categories: [Dev]
---

1. `tmux new -s name` 新建名字为 name 的会话(session)，等同 `tmux new-session -s name`, 指定名字方便 attach。
1. `tmux rename -t session1 session2` 重命名 session1 为 session2，等同 `tmux rename-session -t session1 session2`。
1. `tmux ls` 列出所有会话，等同 `tmux list-sessions`。
1. `tmux at -t name` attach 名字为 name 的会话。
1. `tmux at -d` 重绘窗口，在大小不同屏幕上用 tmux 时候会保持窗口大小为最小尺寸，这个命令就可以重置窗口大小。[via][2]
1. `tmux kill-session -t name` 干掉指定名字的会话，关闭会话所有窗口自动会关掉会话。
1. `tmux kill-window -t name` 关闭指定窗口，很少用，一般都是 `Ctrl-b &` 关闭本窗口。
1. `Ctrl-b d` 脱离会话回到终端。
1. `Ctrl-b [` 进入复制模式，滚屏查看，支持 vim 上下翻页快捷键。
1. `Ctrl-b c` 新建窗口。`Ctrl-b &` 关闭窗口。
1. `set-window-option -g mode-keys vi` 设置复制模式中键盘布局为 vi。
1. `Ctrl-b w` 列出所有窗口，可用 vim j/k 上下翻页。
1. `Ctrl-b : - rename-window` 重命名窗口。
1. `Ctrl-b n/p` 切换到下一个/前一个窗口，也可以直接用 `Ctrl-b 数字` 切换到指定窗口。
1. `Ctrl-b %/"` 分割窗口为面板(panel)。`Ctrl-b x` 关闭面板。
1. `Ctrl-b Alt+方向键` 调整面板大小。
1. `Ctrl-b t` 很酷的一个时钟。

tmux 支持 `~/.tmux.conf` 配置文件，推荐设置 `set-option -g base-index 1` 让窗口从 1 排序，方便数字键切换。更多设置参考 Wiki [使用tmux][1]。

[1]:https://wiki.freebsdchina.org/software/t/tmux
[2]:http://stackoverflow.com/a/7819465/380774

