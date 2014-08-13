---
layout: post
title: "iOS 5 Settings URL scheme"
date: 2012-02-01 12:07
categories: [Share]
---

在 iOS 5+ 可以通过 URL scheme 快速打开【设置】及子项。

```
Settings                prefs:
About                   prefs:root=General&path=About
Accessibility           prefs:root=General&path=ACCESSIBILITY
Airplane Mode On        prefs:root=AIRPLANE_MODE
Auto-Lock               prefs:root=General&path=AUTOLOCK
Brightness              prefs:root=Brightness
Bluetooth               prefs:root=General&path=Bluetooth
Date & Time             prefs:root=General&path=DATE_AND_TIME
FaceTime                prefs:root=FACETIME
General                 prefs:root=General
Keyboard                prefs:root=General&path=Keyboard
iCloud                  prefs:root=CASTLE
iCloud Storage & Backup prefs:root=CASTLE&path=STORAGE_AND_BACKUP
International           prefs:root=General&path=INTERNATIONAL
Location Services       prefs:root=LOCATION_SERVICES
Music                   prefs:root=MUSIC
Music Equalizer         prefs:root=MUSIC&path=EQ
Music Volume Limit      prefs:root=MUSIC&path=VolumeLimit
Network                 prefs:root=General&path=Network
Nike + iPod             prefs:root=NIKE_PLUS_IPOD
Notes                   prefs:root=NOTES
Notification            prefs:root=NOTIFICATIONS_ID
Phone                   prefs:root=Phone
Photos                  prefs:root=Photos
Profile                 prefs:root=General&path=ManagedConfigurationList
Reset                   prefs:root=General&path=Reset
Safari                  prefs:root=Safari
Siri                    prefs:root=General&path=Assistant
Sounds                  prefs:root=Sounds
Software Update         prefs:root=General&path=SOFTWARE_UPDATE_LINK
Store                   prefs:root=STORE
Twitter                 prefs:root=TWITTER
Usage                   prefs:root=General&path=USAGE
VPN                     prefs:root=General&path=Network/VPN
Wallpaper               prefs:root=Wallpaper
Wi-Fi                   prefs:root=WIFI
```

via [Apple Settings App][2]/[Preference Shortcuts][3]

[2]:http://handleopenurl.com/scheme/apple-settings-app
[3]:http://www.idownloadblog.com/2011/11/11/how-to-create-custom-shortcuts-to-wifi-settings-airplane-mode-and-more-no-jailbreak-required/
