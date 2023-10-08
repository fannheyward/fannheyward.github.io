---
layout: post
title: Shell file tests
date: 2023-10-08 10:24:04 +0800
---

List of common file test operators used in shell scripts:

- `-e file`: Check if file exists
- `-f file`: Check if file exists and is a regular file
- `-d file`: Check if file exists and is a *directory*
- `-s file`: Check if file exists and has *size greater than 0*
- `-r file`: Check if file exists and is *readable*
- `-w file`: Check if file exists and is *writable*
- `-x file`: Check if file exists and is *executable*
- `-p file`: Check if file exists and is a *named pipe* (FIFO)
