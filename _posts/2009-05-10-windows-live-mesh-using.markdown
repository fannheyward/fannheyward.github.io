---
layout: post
title: "Windows Live Mesh 使用"
---

首先自我检讨一下，自从自己 Gfans 之后，就莫名的对微软的一些网络服务产生排斥，这样的结果就是让自己错失了很多美好的东西，比如 Windows Live Mesh。

简单的说 Live Mesh 就是一个云计算应用平台，通过 Live Mesh 客户端软件把文件同步到网络在线存储，然后可以通过其他设备，比如手机，或者在另外一台电脑上同样通过 Live Mesh 客户端软件把文件同步到另外的电脑上，最终实现本地电脑文件-网络在线存储文件-第三方设备/电脑文件的同步。Live Mesh 使用很简单：

1. 用 Live ID 登录 Mesh 主页：https://www.mesh.com;
2. 选择 Add Device，然后下载 Mesh 客户端，支持 XP/Vista，Mac 客户端功能现在还不完善；
3. 安装后用 Live ID 登录，添加当前电脑到该账户 Mesh；
4. 然后开始菜单-Live Mesh-Live Mesh Folders，这个文件夹就是 Mesh 的本地映射目录，只是目录，并不是要把同步的文件放到这个文件夹里；
5. 假设我要把我电脑上 D:\Vim 文件夹以及包括的文件同步到 Mesh，Steps：在 Live Mesh Folders 里右键 Live Mesh Opitions-Create folder in Live Mesh，然后 Name:Vim，Location:D:\Vim，OK确认后会提示合并当前文件夹并且当前文件夹里的所有文件会同步到其他设备，确认即可，之后就同步到网络在线存储。
6. 登录 https://www.mesh.com/Web/Desktop.aspx 就可以查看同步到在线存储的 Vim 文件夹；
7. 以后对 D:\Vim 下文件进行修改就会自动同步到 Live Mesh。

Live Mesh 这种云存储在线同步方案非常方便，可以多设备多平台同步，网络在线存储也可以保证数据安全性，当然，再 YY 一下如果加上版本控制的话会更好。

白话一下 Windows Live 应用。在使用 Mesh 的时候看了看另外两个跟 Mesh 非常像的服务：Windows Live SkyDrive 和 Windows Live Sync，这三个的差别一度让我迷惑了好久，[这里](http://livesino.net/archives/1660.live)有一篇漫谈，详细分析了一下三个的区别。我的理解，SkyDrive 就是一个网络硬盘，一个在线存储空间；Sync 强调的是多台计算机之间通过 Sync 软件进行数据同步，但是没有在线数据存储服务；Mesh 也就是这两个的综合，在线存储加上多台电脑的数据同步。其实完全可以把这三个和为一个，搞这么多反而让人不知所措，Windows Live 服务的品牌混乱，重复开发，服务重叠，自己跟自己打架。
