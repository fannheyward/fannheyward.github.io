---
layout: post
title: Patch Notes
date: 2020-02-15 23:32:03 +0800
---

1. Create patch file: `diff -u file1 file2 > name.patch`, or `git diff > name.patch`
1. Apply path file: `patch [-u] < name.patch`
1. Backup before apply patch: `patch -b < name.patch`
1. Validate patch without apply: `patch --dry-run < name.patch`
1. Reverse applied path: `patch -R < name.patch`

