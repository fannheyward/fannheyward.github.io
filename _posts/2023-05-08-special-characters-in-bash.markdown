---
layout: post
title: Special Characters in Bash
date: 2023-05-08 14:56:09 +0800
---

- `$0`: name of the script
- `$1` to `$9`, arguments to the script. `$1` is the first argument and so on.
- `$@`: all the arguments
- `$#`: number of arguments
- `$?`: return code of the previous command
- `$$`: process identification number (PID) for the current script

FYI:

- <https://tldp.org/LDP/abs/html/special-chars.html>
- <https://missing.csail.mit.edu/2020/shell-tools/>