---
layout: post
title: Using special SSH key for Git
date: 2019-07-23 09:33:32 +0800
---

In `~/.ssh/config`:

```
host github.com
    HostName github.com
    IdentityFile ~/.ssh/id_rsa_github
    User git
```

don't forget `chmod 600 ~/.ssh/config`

Or, use `GIT_SSH_COMMAND` environment variable:

```
export GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa_example -F /dev/null"
```
