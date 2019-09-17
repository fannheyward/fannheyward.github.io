---
layout: post
title: Google Code Review Guide
date: 2019-09-17 14:14:24 +0800
---

- [The Change Author’s Guide](https://google.github.io/eng-practices/review/developer/)
- [The Code Reviewer’s Guide](https://google.github.io/eng-practices/review/reviewer/)

0. 原则：给出技术上的建议，而不是个人偏好
1. 写一个好的 commit：
    1. 第一行，改动的简短摘要
    2. 空行
    3. 详细提交信息
2. 小修改，多提交
    1. 方便 review/merge/roll back
    2. 利于好的代码设计，减少 bug
3. Code review 看什么？
    1. 设计
    2. 功能实现是否正确，以及复杂度
    3. 测试
    4. 命名，注释，代码风格，文档等
4. 尽早 review，尽快 review
5. 好的 code review comment
    1. Be kind
    2. 只指出问题，让开发人员自己决定怎么修改
    3. **Encourage developers to simplify code**
