---
layout: post
title: "Make an iOS Static Library"
date: 2014-01-12 21:55
---

做一个 iOS 静态库需要注意的东西：

1. namespace 冲突。静态库用了某第三方库，项目也用了同样的第三方库，在编译的时候就会有 `duplicate symbol` 错误，因为有两份同样的第三方库。解决办法就是把用到的第三方库加上自定义前缀，包括类名、delegate 协议、常量名，尤其需要注意 Category 的方法名要修改。

1. 封装静态库的时候应尽量避免引入重量级第三方库，多自己进行封装。

1. 一个静态库要有自己独有的前缀，所有类名、常量等都要加同样的前缀。

1. 真机+模拟器支持。Xcode 默认只会用当前环境(真机或模拟器)生成静态库，这样的 SDK 不方便其他项目开发时调试。解决办法就是通过脚本生成一份通用库，[build_universal_library.sh][1]，via [SO][2].

1. 文档。静态库的方便是使用者直接拿你提供的方法来用，无需关注具体实现；不方便在于看不到实现，出现问题无法排查，因此需要把 SDK 的版本、更新历史、使用、FAQ 等写成文档，方便使用，也显得 SDK 比较正式规范。

1. 图片等资源文件用 bundle 方式打包。一个简单制作 bundle 的方法：新建文件夹，重命名为 `YourSDK.bundle`，然后 `Show Package Contents` 打开，加入图片。使用图片的时候需要指明 bundle: `[UIImage imageNamed:@"YourSDK.bundle/img.png"]`。也可以用 Target 方式制作 bundle，比如 [iOS Library With Resources][3].

1. 修改 SDK product path，主要是方便打包，参见 [build_universal_library.sh][1].

1. SDK 头文件加上版本号和简单的使用注释，开发者不太喜欢长篇大论的文档 :D.

1. 如果 SDK 有用到 Category，注意项目设置 `Other Linker Flags` 添加 `-ObjC`，[QA1490][4].

1. 开发时可以把 SDK 用子项目形式加到 SDKDemo 项目下，这样可以边开发边测试。SDKDemo 修改 `User Header Search Paths` 为 `${SYMROOT}/${CONFIGURATION}-universal/YourSDK`，路径和 [build_universal_library.sh][1] 保持一致。


[1]:https://gist.github.com/fannheyward/4063755
[2]:http://stackoverflow.com/questions/3520977/build-fat-static-library-device-simulator-using-xcode-and-sdk-4
[3]:http://www.galloway.me.uk/tutorials/ios-library-with-resources/
[4]:https://developer.apple.com/library/mac/qa/qa1490/_index.html

