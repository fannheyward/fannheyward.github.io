---
layout: post
title: "Zsh Shared History"
date: 2014-10-16 08:49:57 +0800
---

You can share every commands between all terminals with Zsh shared history. In your `.zshrc`:

```
# enable shared history
setopt inc_append_history
setopt share_history

# disable shared history
unsetopt inc_append_history
unsetopt share_history
```
