---
layout: post
title: fastlane notes
date: 2018-02-09 13:59:47 +0800
---

`gem install fastlane -NV`.

fastlane match:

    1. `fastlane match init` 初始化生成 `Matchfile`，设置私有仓库来保存密钥和证书。
    2. `fastlane match development/appstore` 同步或生成证书及描述文件，多 target 可以通过 `--git_branch` 指定
    3. `fastlane match nuke distribution` 吊销证书

`fastlane gym --scheme X` 编译打包。

`fastlane pilot upload` 上传 TestFlight.

`fastlane deliver` 上传 iTC.