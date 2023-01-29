---
layout: post
title: brew operation timed out
date: 2023-01-29 11:20:42 +0800
---

`brew` error:

> Operation timed out after 5000 milliseconds with 2740800 out of 3443379 bytes received

Slow internet connection will cause this error. `export HOMEBREW_NO_INSTALL_FROM_API=1` to fix this, installing from API is the default behavior in brew 3.6.20.
