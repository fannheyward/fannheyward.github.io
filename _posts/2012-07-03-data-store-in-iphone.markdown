---
layout: post
title: "iPhone 数据存储"
date: 2012-07-03 22:36
---

稍微总结一下 iPhone 的数据存储。常见的方式有这么几种：

1. NSUserDefaults
1. SQLite
1. Core Data
1. iCloud
1. NSKeyedArchiver/NSKeyedUnarchiver
1. Keychain
1. UIPasteboard
1. writeToFile:

----

### NSUserdefaults

`NSUserdefaults` 是最为常见的方式，通常用来保存简单的数据，比如 App 设置等。数据保存在 `$App/Library/Preferences/$BundleID.plist`。

```
// 存
[[NSUserDefaults standardUserDefaults] setInteger:100 forKey:@"MaxCount"];
[[NSUserDefaults standardUserDefaults] synchronize];

// 取
[[NSUserDefaults standardUserDefaults] stringForKey:@"StringKey"];
```

存数据时候最好 `[[NSUserDefaults standardUserDefaults] synchronize];` 来及时保存。

### SQLite

iPhone 自带了 SQLite 数据库，可以用来存储大数据量的持久化数据，比如 Google Reader 类阅读器缓存的文章内容。SQLite 直接操作 Api 很复杂，一般都会选用一些开源的 wrapper，比如 [FMDB][1].

### Core Data

`Core Data` 是苹果官方推荐的数据存储方式，底层也是拿 SQLite 做持久化。目前还没有在项目中实践过 Core Data，不多说，官方文档 [Introduction to Core Data Programming Guide][2].

### iCloud

`iCloud` 是 iOS 5 带来的新特性，云端同步是最大的优点，iOS+OS X 通用，可以拿来做一些很神奇的事情，比如 Tweetbot 通过 iCloud 同步 iPhone 和 iPad 上时间线的阅读位置。目前也没有在项目中实践过。

`iCloud` 可以和 `NSUserDefaults` 配合使用，比如 [MKiCloudSync][3]，sync your NSUserDefaults to iCloud automatically。

### NSKeyedArchiver

`NSKeyedArchiver` 可以将数据 encode 后保存成文件，或者通过 `NSUserDefaults` 保存；对应 `NSKeyedUnarchiver` 用来读取数据。适合数据结构复杂（NSArray/NSDictionary）数据量较大但又不需要用 SQLite 做持久化存储的中间缓存，比如 MKNetworkKit 的 `freezeOperations` 操作，很方便。

```
// 保存 dict 到 Library 下 Dict 文件
[NSKeyedArchiver archiveRootObject:dict
                            toFile:NIPathForLibraryResource(@"Dict")];
// 读取
NSDictionary *dict = [NSKeyedUnarchiver unarchiveObjectWithFile:NIPathForLibraryResource(@"Dict")];
```

### Keychain

`Keychain` 就是钥匙串，加密保存用户帐号、密码等重要信息。推荐两个 wrapper：[SSKeychain][4], [PDKeychainBindingsController][5]

### UIPasteboard

`UIPasteboard` 系统剪贴板是一个非常巧妙的数据存储方式，最大的好处就是可以夸应用数据访问，比如词典应用自动读取翻译剪贴板内容，非常方便。[OpenUDID][6] 就是通过一个特殊的剪贴板来保存唯一设备字符串，这样其他 App 就可以用这个唯一标识做设备区分。

### writeToFile:

`writeToFile:` 可以直接将数据写入到指定路径的文件中，NSArray、NSDictionary、NSData 都支持。做数据缓存用的比较多，比如 [EGOCache][7]。

[1]:https://github.com/ccgus/fmdb
[2]:https://developer.apple.com/library/mac/#documentation/cocoa/Conceptual/CoreData/cdProgrammingGuide.html
[3]:https://github.com/MugunthKumar/MKiCloudSync
[4]:https://github.com/samsoffes/sskeychain
[5]:https://github.com/carlbrown/PDKeychainBindingsController
[6]:https://github.com/ylechelle/OpenUDID/
[7]:https://github.com/enormego/EGOCache

