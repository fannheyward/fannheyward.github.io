---
layout: post
title: GitHub Actions Canceled Unexpectedly
date: 2019-11-27 09:31:22 +0800
---

By default, GitHub will cancel all in-progress jobs if if any `matrix` job fails. Set `fail-fast: false` to fix this.

- <https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#jobsjob_idstrategyfail-fast>
- <https://github.community/t5/GitHub-Actions/Build-got-was-canceled-unexpectedly/m-p/31748#M887>
