---
layout: post
title: Shell Notes
date: 2018-04-25 11:35:39 +0800
---

`&&` `||` `;` in shell command:

* `cmd1 && cmd2` means cmd2 will only run while cmd1 **success**.
* `cmd1 || cmd2` means cmd2 will only run while fmd1 **fails**.
* `cmd1 ; cmd2` will run cmd2 regardless cmd1 success or not.