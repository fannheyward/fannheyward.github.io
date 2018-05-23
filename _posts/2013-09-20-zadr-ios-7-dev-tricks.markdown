---
layout: post
title: "@zadr's iOS 7 dev tricks"
date: 2013-09-20 20:30
---

[@zadr][1] 在 iOS 7 正式发布几个小时后在 Twitter 上连续发了一些 iOS 7 SDK 小技巧，大部分都是我还不知道的东西，所以摘录一下，版权归 [@zadr][1] 完全所有。

> iOS 7: -[AVPlayer volume] and -[AVPlayer muted]; ! You can finally programmatically control the volume of playback without private APIs! [via](https://twitter.com/zadr/status/380401811670044672)

AVPlayer 音量状态。

> iOS 7: [CTTelephonyNetworkInfo currentRadioAccessTechnology]; what kind of cellular connection you're on now. LTE/GPRS/CDMA{Rev 0, …}/etc! [via](https://twitter.com/zadr/status/380402599876259840)

获取运营商网络类别。

> iOS 7: -[NSArray firstObject]; Like -[NSArray lastObject];, only, the other end of the array. [via](https://twitter.com/zadr/status/380402801236385792)

NSArray 直接取第一个对象。推荐 [Underscore.m][2].

> iOS 7: NSData has base64 encoding/decoding support now. And this fancy method, enumerateByteRangesUsingBlock:. [via](https://twitter.com/zadr/status/380403108049727488)

NSData 有了原生的 base64 方法 `base64EncodedStringWithOptions:`。

> iOS 7: NSURLComponents: Build a NSURL and have it automatically handle encoding of strings for fragement/path/query/etc. [via](https://twitter.com/zadr/status/380404016796024832)

NSURLComponents 自动编码处理。

> iOS 7: iAd support for prerolls in MPMoviePlayerController. This is more of a heads up than an FYI. [via](https://twitter.com/zadr/status/380404502970376192)

iAd 支持从前卷广告类型。

> iOS 7: JavaScriptCore! Bridge between executing native code and executing JavaScript without needing a UIWebView. [via](https://twitter.com/zadr/status/380404740690956288)

ObjC 直接操作 JS 的 API，JavaScriptCore 是个里程碑，值得好好学习一番。

> iOS 7: MKDistanceFormatter. Localized, unit-specific formatting of distances for both imperial and metric systems. [via](https://twitter.com/zadr/status/380405193843560448)

MapKit 相关，支持本地化的地点距离换算。

> iOS 7: -[MPVolumeView wirelessRouteActive] and -[MPVolumeView wirelessRoutesAvailable] — Customize volume control when AirPlay is available. [via](https://twitter.com/zadr/status/380405692126875648)

AirPlay 音量控制。

> iOS 7: -[UIScrollView keyboardDismissMode]; — Easily recreate Messages.app's scroll-to-dismiss-keyboard behavior! [via](https://twitter.com/zadr/status/380406489321455616)

类似系统 Message 的键盘滑动消失效果，`UIScrollViewKeyboardDismissModeInteractive`.

> iOS 7: UITextView supports inserting and tapping on links. Making your own Twitter client just got that much easier! [via](https://twitter.com/zadr/status/380407288319586306)

UITextView 支持链接点击，应该是 TextKit 带来的新功能。TextKit 也是一个很值得学习的新东西。

> iOS 7: AVCaptureDeviceFormat has video zooming with stabilization and simple control over frame rate/duration! [via](https://twitter.com/zadr/status/380408420563550208)

视频录制支持缩放，以前不支持？

> iOS 7: AVSpeechSynthesis - Speak text to users without requiring VoiceOver to be turned on. [via](https://twitter.com/zadr/status/380409057451847681)

VoiceOver 相关。

> iOS 7: Foundation changed a whole bunch of return types to be `instancetype` instead of `id`. Yay, type safety! [via](https://twitter.com/zadr/status/380410754765037568)

默认对象返回类型改为 [instancetype][3]，自己封装的类库要跟进。

> iOS 7: MediaAccessibility. New framework that makes it *really* easy to work with closed captions and video. [via](https://twitter.com/zadr/status/380412553374863360)

图片视频功能继续加强。

> iOS 7: MFMessageComposeViewController supports adding attachments! Take a photo/video and iMessage it to someone in the same flow. [via](https://twitter.com/zadr/status/380413253668454400)

邮件分享支持直接添加附件。

> iOS 7: AVCaptureMetadataOutput can detect and decode most kinds of barcodes, including QR codes! [via](https://twitter.com/zadr/status/380417180937879552)

原生支持二维码扫描！

> iOS 7: Also fixed some security vulnerabilities and updated root certificates. Check 'em out, http://support.apple.com/kb/HT5934 [via](https://twitter.com/zadr/status/380418048445779968)

修复了一些证书相关的安全问题。

> iOS 7: SSReadingList. Add Stuff to Safari's reading list that syncs between your Mac and iOS devices. [via](https://twitter.com/zadr/status/380426134627696640)

Safari Reading List API。

> iOS 7: I don't even know how to describe it accurately, but, there's some amazing motion APIs in there to explore. Can't call out just one. [via](https://twitter.com/zadr/status/380427171275108352)

CoreMotion API，M7 也是 iPhone 5s 最吸引我的东西。

> iOS 7: UIInputView: If you have a custom input field, use this as the root object. All subviews then get tinting and blur effects. [via](https://twitter.com/zadr/status/380428063642644480)

iOS 7 输入框的模糊效果。

> iOS 7: UISimpleTextPrintFormatter: Print attributed strings without having to fall back to CoreGraphics to render content before printing. [via](https://twitter.com/zadr/status/380428588933079042)

更为简单的打印内容格式化。

iOS 7: -[NSObject decreaseSize:] / -[NSObject increaseSize:]; // called when cmd+ & cmd- are hit, so you can increase/decrease content size. [via](https://twitter.com/zadr/status/380428996036423680)

外接键盘可控制显示大小，类似 OS X 上的 Cmd+/Cmd-.

> iOS 7: dispatch_source_memorypressure_flags_t, for whenever the system's memory pressure conditions change. Critical <-> Warn <-> Normal. [via](https://twitter.com/zadr/status/380497612312281088)

GCD 相关，话说 GCD 的使用一直停留在基本层面，要多多深入。

PS: 分享一个 Twitter 搜索技巧: [iOS 7 from:zadr][4] 即可搜索 @zadr 所有包含 iOS 7 关键字的 Tweets。最后鄙视一下一些所谓的开发者，完全无视 [NDA][5] 的存在，在 iOS 7 SDK 正式发布前通过翻译等方式来刷自己的技术存在感。

[1]:https://twitter.com/zadr
[2]:http://underscorem.org/
[3]:http://nshipster.com/instancetype/
[4]:https://twitter.com/search?q=from%3Azadr%20iOS%207
[5]:http://en.wikipedia.org/wiki/Non-disclosure_agreement

