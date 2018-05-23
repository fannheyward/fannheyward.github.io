---
layout: post
title: "iOS URL Loading System"
date: 2012-11-06 10:37
---

iOS 整个网络请求系统分为这几部分：

* URL Loading:
    * NSURLRequest / NSMutableURLRequest
    * NSURLResponse / NSHTTPURLResponse
    * NSURLConnection
* Cache Management
    * NSURLCache
    * NSCachedURLResponse
* Authentication and Credentials
    * NSURLCredential
    * NSURLCredentialStorage
    * NSURLAuthenticationChallenge
    * NSURLAuthenticationChallengeSender
    * NSURLProtectionSpace
* Cookie Storage
    * NSHTTPCookie
    * NSHTTPCookieStorage
* Protocol Support
    * [NSURLProtocol][2]
    * NSURLProtocolClient

参考 [URL Loading System Overview][1].

[1]:https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/URLLoadingSystem/URLLoadingSystem.html
[2]:http://nshipster.com/nsurlprotocol/

