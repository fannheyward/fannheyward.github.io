---
layout: post
title: "TP-Link WR941N 刷 OpenWrt"
date: 2012-11-29 09:47
---

硬件版本 TP-Link WR941N V4/V5 00000000，软件版本 3.11.7 build 100723，从 [OpenWrt trunk][1] 下载对应固件 openwrt-ar71xx-generic-tl-wr941nd-v4-squashfs-factory.bin。其他型号参考 [Table of Hardware][2] 下载固件。

登录路由器升级固件，待路由自动重启后 `telnet 192.168.1.1` 连上路由器，`passwd` 设置密码，之后就可以通过 `ssh root@192.168.1.1` 登录路由器。

OpenWrt 默认没有开启无线网络，参考 [TP-Link TL-WR941ND][4] 手动修改 `vi /etc/config/wireless`: (修改之前最好备份一下配置文件)

```
config wifi-device  radio0
        option type     mac80211
        option channel  11
        option hwmode   11ng
        option path     'pci0000:00/0000:00:00.0'
        option htmode   HT20
        list ht_capab   SHORT-GI-40
        list ht_capab   TX-STBC
        list ht_capab   RX-STBC1
        list ht_capab   DSSS_CCK-40
        # REMOVE THIS LINE TO ENABLE WIFI:
        # option disabled 1 (删除或注释这一行)

config wifi-iface
        option device   radio0
        option network  lan
        option mode     ap
        option ssid     OpenWrt
        option encryption psk (默认没有加密，修改为 psk)
        option key      xxxxxxxxx
```

重启路由网络:

```
/etc/init.d/network restart
```

配置 PPPoE，`vi /etc/config/network`:

```
config interface 'wan'
        option ifname 'eth1'
        option proto pppoe
        option username 1234567
        option password 7654321
        option macaddr xx:xx:xx:xx:xx:xx (克隆路由器网卡地址)
```
再次重启路由网络进行拨号。

安装 [LuCI][3] web 界面，这样就可以在浏览器操作路由：

```
opkg update
opkg install luci
/etc/init.d/uhttpd enable
/etc/init.d/uhttpd start
```

现在就可以通过 `http://192.168.1.1` 修改路由器配置。

如果网络修改失败不能 ssh 登录，可以[进入安全模式][5]恢复：

> 路由上电时，灯会全亮一下，这时你要全神贯注了，当sys灯再次亮时，要立刻按reset2-3秒，然后你就会发现sys灯快闪了。这说明，安全模式成功了！

本机 IP 改为 192.168.1.5，`telnet 192.168.1.1` 连上，然后 `firstboot` 恢复。

[1]:http://downloads.openwrt.org/snapshots/trunk/ar71xx/
[2]:http://wiki.openwrt.org/toh/start
[3]:http://wiki.openwrt.org/doc/howto/luci.essentials
[4]:http://wiki.openwrt.org/toh/tp-link/tl-wr941nd
[5]:http://www.right.com.cn/forum/thread-42810-1-1.html

