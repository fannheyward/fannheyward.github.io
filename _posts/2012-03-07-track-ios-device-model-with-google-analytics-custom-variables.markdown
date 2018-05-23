---
layout: post
title: "Track iOS Device Model with Google Analytics Custom Variables"
date: 2012-03-07 16:58
---

Add [Google Analytics SDK for iOS ][1] to app project first.

```
#import <sys/utsname.h>

- (NSString*)deviceModel {
    struct utsname systemInfo;
    uname(&systemInfo);

    return [NSString stringWithCString:systemInfo.machine
                              encoding:NSUTF8StringEncoding];
}

NSString *model = [self deviceModel];
// model = @"iPhone3,1", as iPhone 4.
[[GANTracker sharedTracker] setCustomVariableAtIndex:1 //range from 1-5, not be re-used.
                                                name:@"DeviceModel"
                                               value:model
                                               scope:kGANSessionScope
                                           withError:NULL];

NSString *sysVersion = [[UIDevice currentDevice] systemVersion];
// sysVersion = @"5.0.1"
[[GANTracker sharedTracker] setCustomVariableAtIndex:2
                                                name:@"SystemVersion"
                                               value:sysVersion
                                               scope:kGANSessionScope
                                           withError:NULL];
```

Then, you can get the report on Google Analytics Audience / Demographics / Custom Variables.

[1]:https://code.google.com/apis/analytics/docs/mobile/ios.html

