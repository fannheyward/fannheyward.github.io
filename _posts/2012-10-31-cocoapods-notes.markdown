---
layout: post
title: "CocoaPods Notes"
date: 2012-10-31 14:24
categories: [Dev]
---

[CocoaPods][1], an Objective-C library dependency manager.

----

安装：

```
sudo gem install cocoapods
pod setup //初始化更新 Specs
```

新建项目，在项目 **根目录** 新建 `Podfile` 文件：

```
platform :ios, '5.0'

pod 'AFNetworking'
pod 'SDWebImage', :git => 'https://github.com/appwilldev/SDWebImage.git'
pod 'JSONKit', :podspec => 'https://raw.github.com/gist/1346394/1d26570f68ca27377a27430c65841a0880395d72/JSONKit.podspec'
```

Podfile 可以指定具体代码地址，具体一个 commit/tag，或者具体 podspec (多用于私有库)。安装相关 Pods：

```
pod install
```

CocoaPods 会新建一个和项目同名的 workspace，以后就用这个 workspace 来打开项目。需要新加或删除库的话就直接编辑 Podfile 然后再 `pod install`.

----

添加 [CocoaPods/Specs][2] 没有或私有库：

```
pod spec create WeiboEngine https://github.com/fannheyward/WeiboEngine
// 如果指定 Github 链接，会获取代码库相关信息来初始化 podspec.
```

自动生成 `WeiboEngine.podspec` 文件，按照模板编辑修改相关作者、项目主页等信息。重点是 `s.source` 设置。`s.source` 指定代码库地址，支持 git/hg/svn 代码库，支持 http://example.com/source.zip 代码压缩包，支持用 `:tag` `:commit` 指定具体版本。`s.source_files` 指明代码目录文件。

验证生成的 podspec 文件是否合法正确：

```
pod spec lint WeiboKit.podspec
```

验证通过后把 podspec 保存在 `~/.cocoapods/master/` 即可直接通过 `pod install` 进行安装；也可以向 [CocoaPods/Specs][2] 提交新建的 spec:

```
pod setup --push
pod push master
```

[1]:https://github.com/CocoaPods/CocoaPods
[2]:https://github.com/CocoaPods/Specs

