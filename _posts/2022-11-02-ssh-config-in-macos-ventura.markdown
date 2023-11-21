---
layout: post
title: SSH config in macOS Ventura
date: 2022-11-02 18:03:11 +0800
---

macOS Ventura changed SSH algorithm, you need to update your SSH config file `~/.ssh/config` to make it work.

```bash
Host *
    UseKeychain yes
    IdentitiesOnly yes
    HostkeyAlgorithms +ssh-rsa
    PubkeyAcceptedKeyTypes +ssh-rsa
    PubkeyAcceptedAlgorithms +ssh-rsa
```
