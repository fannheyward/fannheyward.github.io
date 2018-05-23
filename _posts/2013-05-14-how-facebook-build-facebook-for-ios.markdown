---
layout: post
title: "How FB Build Facebook for iOS"
date: 2013-05-14 11:46
---

[Mobile DevCon New York - How We Built Facebook for iOS][1]

非常值得一看，介绍了 FB 开发 Facebook.app 的工作流。摘要记录几点：

1. Core Team, support and assist. 主要负责不同应用之间通用库、共用功能的开发，保证应用的稳定性。//这也是目前我在做和努力的方向，接下来是团队内跨应用支持。
1. Release process. FB 有专门的 release team，效仿 Mozilla 每四周发布流程，如果发布周期有功能还不稳定就通过 `#define` runtime 屏蔽。//快速迭代。
1. DON'T BREAK MASTER. git branch 进行功能开发，team code review，然后自动编译测试(CI)，通过后合并到 master。 //非常标准的 git workflow，说着容易做到难，尤其是坚持一直这样做。
1. Phabricator code review and CI. [Phabricator][2] 是 FB 开发的 code review 工具，附带 `arc lint` 代码分析工具，enforce style guidelines, set up rules to catch common mistakes.
1. Multiple Builds. 不同的 BundleID 来分发测试 Development build/Daily buid/App Store build。 //目前我们的 daily build 还是手动挡，接下来配上 CI 试试自动化。
1. Testing. 由于 iOS 测试工具链的不成熟和复杂(Data, UI)，FB 采用 Xcode 自带的测试，配合丰富的 Logs+view hierarchy. //目前我们在用 [Lumberjack][3] log 工具，非常不错。

感叹 FB 如此大规模的公司还能如此敏捷开发，技术驱动，而非行政干预，嗯。

[1]:https://developers.facebooklive.com/videos/337/mobile-devcon-new-york-how-we-built-facebook-for-ios
[2]:http://phabricator.org/
[3]:https://github.com/robbiehanson/CocoaLumberjack

